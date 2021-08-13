/** @format */

import * as core from "@actions/core"
import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import { Context } from "vm"
import { log } from ".."
import { Config, Runners, SharedConfig } from "../action"
import { CurContext, PRContext, Reviews, Version } from "../conditions"
import { evaluator } from "../evaluator"
import { Utils } from "../utils"
import { Contexts } from "./methods"
import { AssignProject } from "./methods/assignProject"
import { AutomaticApprove } from "./methods/autoApprove"
import { Release } from "./methods/release"
import { SyncRemote } from "./methods/syncRemoteRepo"

/**
 * The Pull Request configuration
 */
export interface PullRequestConfig extends SharedConfig {
	/**
	 *  The project assignment configuration.
	 */
	assignProject?: AssignProject[]
	/**
	 * The automatic approval configuration
	 */
	automaticApprove?: AutomaticApprove
	/**
	 * The release management configuration.
	 */
	manageRelease?: Release
	/**
	 * Syncronise remote repository configuration.
	 */
	syncRemote?: SyncRemote[]
}

/**
 * The pull request class.
 * @private
 */
export class PullRequests extends Contexts {
	context: PRContext
	config: PullRequestConfig
	constructor(
		util: Utils,
		runners: Runners,
		configs: Config,
		curContext: CurContext,
		dryRun: boolean
	) {
		if (curContext.type !== "pr")
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot construct without pr context"
			)
		super(util, runners, configs, curContext, dryRun)
		this.context = curContext.context
		if (!configs.pr)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot start without config"
			)
		this.config = configs.pr
	}

	/**
	 * Parse the PR Context
	 * @author IvanFon, TGTGamer, jbinda
	 * @since 1.0.0
	 */
	static async parse(
		utils: Utils,
		config: Config,
		context: Context
	): Promise<PRContext | undefined> {
		const pr = context.payload.pull_request
		if (!pr) {
			return
		}

		log(
			LoggingLevels.debug,
			`context.payload.pull_request: ` +
				JSON.stringify(context.payload.pull_request)
		)

		const IDNumber = pr.number
		const labels = await utils.parsingData.labels(pr.labels).catch((err) => {
			log(LoggingLevels.error, `Error thrown while parsing labels: `, err)
			throw err
		})
		const files: string[] = await utils.api.files
			.list(IDNumber)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while listing files: `, err)
				throw err
			})

		const changes: number = await utils.api.pullRequests
			.changes(pr.additions, pr.deletions)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while handling changes: `, err)
				throw err
			})

		const reviews: Reviews = await utils.api.pullRequests.reviews
			.list(IDNumber)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while handling reviews: `, err)
				throw err
			})

		const pendingReview: boolean = await utils.api.pullRequests.reviews
			.pending(reviews.length, pr.requested_reviewers.length)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while handling reviews: `, err)
				throw err
			})

		const requestedChanges: number = await utils.api.pullRequests.reviews
			.requestedChanges(reviews)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while handling reviews: `, err)
				throw err
			})

		const approved: number = await utils.api.pullRequests.reviews
			.isApproved(reviews)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while handling reviews: `, err)
				throw err
			})

		const currentVersion: Version = await utils.versioning
			.parse(config, config.pr?.ref)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while parsing versioning: `, err)
				throw err
			})

		return {
			ref: pr.base.ref,
			sha: context.sha,
			action: context.payload.action as string,
			currentVersion,
			IDNumber: context.payload.pull_request?.id,
			props: {
				type: "pr",
				ID: IDNumber,
				branch: pr.head.ref,
				creator: pr.user.login,
				description: pr.body || "",
				isDraft: pr.draft,
				locked: pr.locked,
				state: pr.state,
				title: pr.title,
				files,
				changes,
				reviews,
				labels,
				pendingReview,
				requestedChanges,
				approved
			}
		}
	}

	async run(attempt?: number) {
		if (!this.config) throw new Error("Cannot start without config")
		if (!attempt) {
			attempt = 1
			core.startGroup("Pull Request Actions")
		}
		const seconds = attempt * 10
		let enforceConventionsSuccess = true

		try {
			if (this.config.enforceConventions && this.util.shouldRun("convention"))
				enforceConventionsSuccess = await this.conventions.enforce(this)
			if (enforceConventionsSuccess) {
				if (this.config.labels && this.util.shouldRun("label"))
					await this.applyLabels(this).catch((err) => {
						log(LoggingLevels.error, "Error applying labels", err)
					})
				if (this.config.assignProject && this.util.shouldRun("release"))
					await this.assignProject(this).catch((err) => {
						log(LoggingLevels.error, "Error assigning projects", err)
					})
				// if (this.config.automaticApprove)
				//   await this.automaticApprove(this.config.automaticApprove)
				// duplicate hotfix
				if (this.config.manageRelease && this.util.shouldRun("release"))
					await this.bumpVersion(this.config.manageRelease.labels)
				// create changelog
				// create release
				// sync remote repositories
				// if (this.config.syncRemote) await this.syncRemoteRepo(this)
				core.endGroup()
			}
		} catch (err) {
			if (attempt > this.retryLimit) {
				core.endGroup()
				throw log(
					LoggingLevels.emergency,
					`Pull Request actions failed. Terminating job.`
				)
			}
			log(
				LoggingLevels.warn,
				`Pull Request Actions failed with "${err}", retrying in ${seconds} seconds....`
			)
			attempt++
			setTimeout(async () => {
				this.newVersion = await this.util.versioning.parse(
					this.configs,
					this.config?.ref || this.context.ref
				)
				this.run(attempt)
			}, seconds * 1000)
		}
	}

	automaticApprove(automaticApprove: PullRequestConfig["automaticApprove"]) {
		if (!automaticApprove || !automaticApprove.conventions)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Not Able to automatically approve"
			)
		automaticApprove.conventions.forEach((convention) => {
			if (!convention.conditions) return
			if (evaluator.call(this, convention, this.context.props)) {
				log(LoggingLevels.info, `Automatically Approved Successfully`)
				const body =
					automaticApprove.commentHeader +
					"\n\n Automatically Approved - Will automatically merge shortly! \n\n" +
					automaticApprove.commentFooter
				this.util.api.pullRequests.reviews.create(
					this.context.IDNumber,
					body,
					"APPROVE"
				)
				return true
			} else {
				core.setFailed(convention.failedComment)
				return false
			}
		})
	}

	bumpVersion(labels: Release["labels"]) {
		if (!labels || !this.context.props.labels) return
		if (
			(!this.configs.versioning || this.configs.versioning.type == "SemVer") &&
			this.newVersion.semantic
		) {
			if (
				this.context.props.labels[labels.major] || labels.breaking
					? this.context.props.labels[labels.major]
					: true
			) {
				this.newVersion.semantic.major++
			} else if (this.context.props.labels[labels.minor]) {
				this.newVersion.semantic.minor++
			} else if (this.context.props.labels[labels.patch]) {
				this.newVersion.semantic.patch++
			}
			if (this.context.props.labels[labels.prerelease]) {
				this.newVersion.semantic.prerelease =
					this.newVersion.semantic.prerelease ||
					this.configs.versioning?.prereleaseName ||
					"prerelease"
			}
			if (this.context.props.labels[labels.build]) {
				this.newVersion.semantic.build = +1
			}
			this.newVersion.name = `${this.newVersion.semantic.major}.${
				this.newVersion.semantic.minor
			}.${this.newVersion.semantic.patch}${
				this.newVersion.semantic.prerelease
					? `-${this.newVersion.semantic.prerelease}`
					: ""
			}${
				this.newVersion.semantic.build
					? `+${this.newVersion.semantic.build}`
					: ""
			}`
			log(LoggingLevels.debug, `New Version is: ${this.newVersion.name}`)
		}
	}
}

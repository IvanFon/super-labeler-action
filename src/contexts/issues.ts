/** @format */

import * as core from "@actions/core"
import { Context } from "@actions/github/lib/context"
import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import { log } from ".."
import { Config, Runners, SharedConfig } from "../action"
import { CurContext, IssueContext, Version } from "../conditions"
import { Utils } from "../utils"
import { Contexts } from "./methods"
import { AssignProject } from "./methods/assignProject"
import { CreateBranch } from "./methods/createBranch"

/**
 * The issue configuration
 */
export interface IssueConfig extends SharedConfig {
	/**
	 * Assign project configuration.
	 */
	assignProject?: AssignProject[]
	/**
	 * Open branch configuration
	 */
	createBranch?: { [label: string]: CreateBranch }
}

/**
 * The issue class.
 * @private
 */
export class Issues extends Contexts {
	context: IssueContext
	config: IssueConfig
	constructor(
		util: Utils,
		runners: Runners,
		configs: Config,
		curContext: CurContext,
		dryRun: boolean
	) {
		if (curContext.type !== "issue")
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot construct without issue context"
			)
		super(util, runners, configs, curContext, dryRun)
		this.context = curContext.context
		if (!configs.issue)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot start without config"
			)
		this.config = configs.issue
	}

	/**
	 * Parse the Issue Context
	 * @author IvanFon, TGTGamer, jbinda
	 * @since 1.0.0
	 */
	static async parse(
		utils: Utils,
		config: Config,
		context: Context
	): Promise<IssueContext | undefined> {
		const issue = context.payload.issue
		if (!issue) {
			return
		}

		log(
			LoggingLevels.debug,
			`context.payload.issue: ` + JSON.stringify(context.payload.issue)
		)

		const labels = await utils.parsingData.labels(issue.labels).catch((err) => {
			log(LoggingLevels.error, `Error thrown while parsing labels: `, err)
			throw err
		})

		const currentVersion: Version = await utils.versioning
			.parse(config, config.issue?.ref)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while parsing versioning: `, err)
				throw err
			})

		return {
			sha: context.sha,
			action: context.payload.action as string,
			currentVersion,
			IDNumber: context.payload.issue?.id,
			props: {
				type: "issue",
				ID: issue.number,
				creator: issue.user.login,
				description: issue.body || "",
				locked: issue.locked,
				state: issue.state,
				labels,
				title: issue.title
			}
		}
	}

	async run(attempt?: number) {
		if (!this.config)
			throw new LoggingDataClass(
				LoggingLevels.warn,
				"Cannot start without config"
			)
		if (!attempt) {
			attempt = 1
			core.startGroup("Issue Actions")
		}
		let seconds = attempt * 10,
			enforceConventionsSuccess = true
		try {
			if (this.config.enforceConventions && this.util.shouldRun("convention"))
				enforceConventionsSuccess = await this.conventions.enforce(this)

			if (enforceConventionsSuccess) {
				if (this.config.labels && this.util.shouldRun("label"))
					await this.applyLabels(this).catch((err) => {
						log(LoggingLevels.error, "Error applying label", err)
					})

				if (this.config.assignProject && this.util.shouldRun("release"))
					await this.assignProject(this).catch((err) => {
						log(LoggingLevels.error, "Error assigning projects", err)
					})

				core.endGroup()
			}
		} catch (err) {
			if (attempt > this.retryLimit) {
				core.endGroup()
				throw new LoggingDataClass(
					LoggingLevels.emergency,
					`Issue actions failed. Terminating job.`
				)
			}
			log(
				LoggingLevels.warn,
				`Issue Actions failed with "${err}", retrying in ${seconds} seconds....`
			)
			attempt++
			setTimeout(async () => {
				this.run(attempt)
			}, seconds * 1000)
		}
	}
}

/** @format */

import * as core from "@actions/core"
import { Context } from "@actions/github/lib/context"
import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import { log } from ".."
import { Config, Runners, SharedConfig } from "../action"
import { CurContext, ScheduleContext } from "../conditions"
import { Utils } from "../utils"
import { Contexts } from "./methods"

/**
 * The schedule configuration
 */
export type ScheduleConfig = SharedConfig

/**
 * The schedule class.
 * @private
 */
export class Schedule extends Contexts {
	context: ScheduleContext
	ctx: ScheduleContext
	config: ScheduleConfig

	constructor(
		util: Utils,
		runners: Runners,
		configs: Config,
		curContext: CurContext,
		dryRun: boolean
	) {
		if (curContext.type !== "schedule")
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot construct without schedule context"
			)
		super(util, runners, configs, curContext, dryRun)
		this.context = curContext.context
		this.ctx = curContext.context
		if (!configs.schedule)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot start without config"
			)
		this.config = configs.schedule
	}

	/**
	 * Parse the Schedule Context
	 * @author TGTGamer
	 * @since 1.0.0
	 */

	static async parse(context: Context): Promise<ScheduleContext | undefined> {
		return {
			ref: context.ref,
			sha: context.sha,
			action: context.payload.action as string
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
			core.startGroup("Schedule Actions")
		}
		const seconds = attempt * 10
		try {
			const issues = await this.util.api.issues.list({})
			issues.forEach(async (issue) => {
				const labels = await this.util.parsingData
					.labels(issue.labels)
					.catch((err) => {
						log(LoggingLevels.error, `Error thrown while parsing labels: `, err)
						throw err
					})

				this.context = {
					...this.ctx,
					props: {
						type: "issue",
						ID: issue.number,
						creator: issue.user?.login ? issue.user.login : "",
						description: issue.body || "",
						locked: issue.locked,
						labels,
						title: issue.title,
						state: issue.state == "open" ? "open" : "closed",
						lastUpdated: issue.updated_at
					}
				}

				log(
					LoggingLevels.debug,
					`Testing issue: ${issue.id} - ${issue.title} - ${issue.html_url} - Last updated: ${issue.updated_at}`
				)
				if (this.config.stale && this.util.shouldRun("label"))
					await this.checkStale(this).catch((err) => {
						log(LoggingLevels.error, "Error checking stale", err)
					})
				log(
					LoggingLevels.debug,
					`Should apply labels? \r\n\r\n\r\n\r\n ${JSON.stringify(
						this.config.labels
					)}`
				)
				if (this.config.labels && this.util.shouldRun("label"))
					await this.applyLabels(this).catch((err) => {
						log(LoggingLevels.error, "Error applying label", err)
					})
			})
			core.endGroup()
		} catch (err) {
			if (attempt > this.retryLimit) {
				core.endGroup()
				throw new LoggingDataClass(
					LoggingLevels.emergency,
					`Scheduled actions failed. Terminating job.`,
					{ errors: err }
				)
			}
			log(
				LoggingLevels.warn,
				`Scheduled Actions failed with "${err}", retrying in ${seconds} seconds....`
			)
			attempt++
			setTimeout(async () => {
				this.run(attempt)
			}, seconds * 1000)
		}
	}
}

/** @format */

import * as core from "@actions/core"
import { Context } from "@actions/github/lib/context"
import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import { Config, Runners, SharedConfig } from "../action"
import { CurContext, ProjectContext, Version } from "../conditions"
import { Utils } from "../utils"
import { Contexts, log } from "./methods"
import { Column } from "./methods/conventions"
import { ProjectCreateBranch } from "./methods/createBranch"
import { Milestones } from "./methods/handleMilestone"
import { ExProjects } from "./methods/syncRemoteProject"

/**
 * The project configuration
 */
export interface ProjectConfig extends SharedConfig {
	/**
	 * Syncronise remote repository configuration.
	 */
	syncRemote?: ExProjects[]
	/**
	 * Open branch configuration
	 */
	openBranch?: ProjectCreateBranch
	/**
	 * Assign to milestone configuration
	 */
	assignMilestone?: {
		[milestone: string]: Milestones
	}
}
/**
 * The project class.
 * @private
 */
export class Project extends Contexts {
	context: ProjectContext
	config: ProjectConfig
	constructor(
		util: Utils,
		runners: Runners,
		configs: Config,
		curContext: CurContext,
		dryRun: boolean
	) {
		if (curContext.type !== "project")
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot construct without project context"
			)
		super(util, runners, configs, curContext, dryRun)
		this.context = curContext.context
		if (!configs.project)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot start without config"
			)
		this.config = configs.project
	}

	/**
	 * Parse the Project Context
	 * @author IvanFon, TGTGamer, jbinda
	 * @since 1.0.0
	 */
	static async parse(
		utils: Utils,
		config: Config,
		context: Context
	): Promise<ProjectContext | undefined> {
		const project = context.payload.project_card
		if (!project) {
			return
		}
		log(
			LoggingLevels.debug,
			`context.payload.project_card: ${JSON.stringify(
				context.payload.project_card
			)}`
		)

		if (!project.content_url) throw new Error("No content information to get")
		const issueNumber: number = project.content_url.split("/").pop()
		const issue = await await utils.api.issues.get(issueNumber)

		const labels = await utils.parsingData.labels(issue.labels).catch((err) => {
			log(LoggingLevels.error, `Error thrown while parsing labels: `, err)
			throw err
		})

		const currentVersion: Version = await utils.versioning
			.parse(config, config.project?.ref)
			.catch((err) => {
				log(LoggingLevels.error, `Error thrown while parsing versioning: `, err)
				throw err
			})

		let localProject
		localProject = await utils.api.project.projects.get(
			project.project_url.split("/").pop()
		)
		const changes = context.payload.changes
		const localColumn = await utils.api.project.column.get(project.column_id)

		const localCard = await utils.api.project.card.get(project.id)

		return {
			sha: context.sha,
			action: context.payload.action as string,
			currentVersion,
			IDNumber: issue.id,
			props: {
				type: "project",
				ID: issue.number,
				creator: issue.user?.login ? issue.user.login : "",
				description: issue.body || "",
				locked: issue.locked,
				state: issue.state as ProjectContext["props"]["state"],
				title: issue.title,
				project: localProject,
				column_id: project.column_id,
				localColumn,
				localCard,
				changes,
				labels
			}
		}
	}

	async run(attempt?: number) {
		if (!this.config)
			throw new LoggingDataClass(
				LoggingLevels.error,
				"Cannot start without config"
			)
		if (!attempt) {
			attempt = 1
			core.startGroup("project Actions")
		}
		if (!attempt) {
			attempt = 1
			core.startGroup("project Actions")
		}
		const seconds = attempt * 10
		let enforceConventionsSuccess = true

		try {
			if (this.config.enforceConventions && this.util.shouldRun("convention")) {
				if (!this.config.enforceConventions.onColumn) return
				this.config.enforceConventions.onColumn =
					await this.convertColumnStringsToIDArray(
						this.config.enforceConventions.onColumn
					)
				if (
					this.config.enforceConventions?.onColumn?.includes(
						this.context.props.column_id
					)
				)
					enforceConventionsSuccess = await this.conventions.enforce(this)
			}

			if (enforceConventionsSuccess) {
				// some code
				if (this.config.labels && this.util.shouldRun("label"))
					await this.applyLabels(this).catch((err) => {
						log(LoggingLevels.error, "Error applying labels", err)
					})
				if (this.config.syncRemote && this.util.shouldRun("release"))
					await this.syncRemoteProject(this).catch((err) => {
						log(LoggingLevels.error, "Error syncing remote project", err)
					})
				core.endGroup()
			}
		} catch (err) {
			if (attempt > this.retryLimit) {
				core.endGroup()
				throw log(
					LoggingLevels.emergency,
					`project actions failed. Terminating job.`
				)
			}
			log(
				LoggingLevels.warn,
				`project Actions failed with "${err}", retrying in ${seconds} seconds....`
			)

			attempt++
			setTimeout(async () => {
				this.run(attempt)
			}, seconds * 1000)
		}
	}
	async convertColumnStringsToIDArray(columns: Column[]): Promise<number[]> {
		const columnList = await this.util.api.project.column.list(
			this.context.props.project.id
		)
		return await columns.map((column) => {
			if (typeof column === "string") {
				let columnID: number | undefined
				columnList.forEach((value) => {
					if (value.name.toLowerCase() == column.toLowerCase())
						columnID = value.id
				})
				if (!columnID)
					throw new LoggingDataClass(
						LoggingLevels.error,
						`${column} doesn't exist on this project`
					)
				return columnID
			} else return column
		})
	}
}

/** @format */

import { LoggingLevels } from "@videndum/utilities"
import { Issues, PullRequests } from ".."
import { log } from "../.."
import { IssueConditionConfig } from "../../conditions"
import { evaluator } from "../../evaluator"

/**
 * Assign project configuration
 */
export interface AssignProject extends IssueConditionConfig {
	/**
	 * The owner of the project
	 */
	owner?: string
	/**
	 * The user of the project
	 */
	user?: string
	/**
	 * The repository name
	 * @requires owner
	 */
	repo?: string
	/**
	 * The project to use
	 * @requires owner|user|repo
	 */
	project: string
	/**
	 * The column to use
	 */
	column: string
}
export async function assignProject(this: Issues | PullRequests) {
	if (!this.config?.assignProject) return
	this.config.assignProject.forEach(async (remote) => {
		// Get projects
		let projects
		if (remote.user)
			projects = await this.util.api.project.projects.user(remote.user)
		else if (remote.owner && !remote.repo)
			projects = await this.util.api.project.projects.org(remote.owner)
		else if (remote.owner && remote.repo)
			projects = await this.util.api.project.projects.repo(
				remote.owner,
				remote.repo
			)
		else
			projects = await this.util.api.project.projects.repo(
				this.util.repo.owner,
				this.util.repo.repo
			)
		// Get the column
		const project = projects.filter(
			(project) => project.name === remote.project
		)[0]
		if (!project) throw log(LoggingLevels.error, "No project to use")
		const columns = await this.util.api.project.column.list(project.id)
		if (!columns) throw log(LoggingLevels.error, "No columns to use")
		const remoteColumn = columns.filter(
			(column) => column.name === remote.column
		)[0]
		if (!remoteColumn) throw log(LoggingLevels.error, "No column to use")

		const should =
			remote.conditions.length > 0
				? evaluator.call(this, remote, this.context.props)
				: true

		if (should) {
			log(LoggingLevels.debug, `Adding to project ${project.name}`)
			!this.dryRun &&
				(await this.util.api.project.card
					.create(
						this.context.IDNumber,
						remoteColumn.id,
						this.context.props.type == "pr" ? "PullRequest" : "Issue"
					)
					.catch((err) => {
						log(
							LoggingLevels.error,
							`New error thrown when attempting to add to project "${project.name}"`,
							err
						)
					}))
		}
	})
}

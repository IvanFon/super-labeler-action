/** @format */

import * as core from "@actions/core"
import { LoggingLevels } from "@videndum/utilities"
import { Issues, Project, PullRequests } from ".."
import { log } from "../.."
import { Condition, SharedConventionConditions } from "../../conditions"
import { evaluator } from "../../evaluator"
import { semantic } from "../../utils/helper/semantic"

/**
 * The enforce conventions configuration
 */

export type Column = string | number
export interface EnforceConventions {
	/**
	 * The columns to enforce conventions
	 */
	onColumn?: Column[]
	/**
	 * The comment to append to the header
	 */
	commentHeader?: string
	/**
	 * The comment to append to the footer
	 */
	commentFooter?: string
	/**
	 * The column to move if fails
	 */
	moveToColumn?: string
	/**
	 * The conventions to enforce
	 */
	conventions: SharedConventionsConfig[]
}

export interface SharedConventionsConfig extends SharedConventionConditions {
	/**
	 * The failed comment to use
	 */
	failedComment: string
	/**
	 * The contexts to use. Use this in combernation with "semanticTitle"
	 * @requires conditions: "semanticTitle"
	 */
	contexts?: string[]
}

export function enforce(this: Issues | PullRequests | Project) {
	if (
		!this.config.enforceConventions ||
		!this.config.enforceConventions.conventions
	)
		throw new Error("No enforceable conventions")
	let required = 0,
		successful = 0,
		failedMessages: string[] = []
	this.config.enforceConventions.conventions.forEach((convention) => {
		if (!convention.conditions) return
		required++
		if (convention.conditions == "semanticTitle") {
			convention.requires = 1
			const conditions: Condition[] = []
			semantic.forEach((pattern) => {
				conditions.push({
					type: "titleMatches",
					pattern: `/^${pattern}(\\(.*\\))?:/i`
				})
			})
			if (convention.contexts) {
				convention.requires++
				convention.contexts.forEach((pattern) => {
					conditions.push({
						type: "titleMatches",
						pattern: `/\\(.*${pattern}.*\\):/i`
					})
				})
			}
			convention.failedComment =
				`Semantic Conditions failed - Please title your ${
					this.curContext.type == "pr" ? "pull request" : "issue"
				} using one of the valid options:\r\n\r\n Types: ` +
				semantic.join(", ") +
				(convention.contexts
					? `\r\n\r\n Contexts: ${convention.contexts.join(", ")}`
					: "")
			convention.conditions = conditions
		}
		if (evaluator.call(this, convention, this.context.props)) {
			successful++
		} else {
			failedMessages.push(convention.failedComment)
		}
	})

	if (required > successful) {
		failedMessages.forEach((fail) => core.setFailed(fail))
		!this.dryRun && createConventionComment.call(this, false, failedMessages)
		return false
	}
	log(
		LoggingLevels.info,
		`All conventions successfully enforced. Moving to next step`
	)
	!this.dryRun && createConventionComment.call(this, true)
	return true
}

async function createConventionComment(
	this: Issues | PullRequests | Project,
	success: boolean,
	failMessages?: string[]
) {
	if (!this.config.enforceConventions) return
	let prefix = `<!--releaseMastermind: Conventions-->`,
		suffix = `\r\n\r\n----------\r\n\r\nThis message will be automatically updated when you make this change\r\n\r\n${
			this.config.enforceConventions.commentFooter || ""
		}`,
		body: string =
			prefix +
			`${this.config.enforceConventions.commentHeader || ""}\r\n\r\n` +
			(success
				? "Conventions corrected - Review no longer required"
				: failMessages?.join("\r\n\r\n") + suffix),
		commentList =
			this.context.props?.type === "pr"
				? await this.util.api.pullRequests.reviews.list(this.context.props.ID)
				: this.context.props?.ID
				? await this.util.api.issues.comments.list(this.context.props.ID)
				: undefined,
		previousComment: number | undefined

	if (commentList) {
		commentList.forEach((comment: any) => {
			if (
				comment.body.includes(prefix) &&
				(!("state" in comment) || comment.state !== "DISMISSED")
			)
				previousComment = comment.id
		})
	}
	this.util.respond(this, success, previousComment, body)
}

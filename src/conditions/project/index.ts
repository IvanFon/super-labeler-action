/** @format */

import { Issues, Project, PullRequests } from "../../contexts"
import { Condition, handlers as sharedHandlers } from "../util"
import onColumn, { ConditiononColumn } from "./onColumn"

export type ProjectCondition = Condition | ConditiononColumn

const handlers = [...sharedHandlers, onColumn]

/**
 * The project condition handler.
 * @private
 */
export function getProjectConditionHandler(
	this: Issues | PullRequests | Project,
	condition: ProjectCondition
) {
	const handler = handlers.find((handler) => handler[0] === condition.type)
	return handler?.[1]
}

export { ProjectProps } from ".."

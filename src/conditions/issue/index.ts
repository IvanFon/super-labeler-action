/** @format */

import { Issues } from "../../contexts"
import { Condition, handlers as sharedHandlers } from "../util"

export type IssueCondition = Condition

const handlers = [...sharedHandlers]

/**
 * The issue condition handler.
 * @private
 */
export function getIssueConditionHandler(
	this: Issues,
	condition: IssueCondition
) {
	const handler = handlers.find((handler) => handler[0] === condition.type)
	return handler?.[1]
}

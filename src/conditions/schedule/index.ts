/** @format */

import { Schedule } from "../../contexts"
import { Condition, handlers as sharedHandlers } from "../util"

export type ScheduleCondition = Condition

const handlers = [...sharedHandlers]

/**
 * The schedule condition handler.
 * @private
 */
export function getScheduleConditionHandler(
	this: Schedule,
	condition: ScheduleCondition
) {
	const handler = handlers.find((handler) => handler[0] === condition.type)
	return handler?.[1]
}

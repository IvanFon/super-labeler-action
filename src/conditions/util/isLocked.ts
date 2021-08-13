/** @format */

import { UtilProps, UtilThis } from ".."

const TYPE = "isLocked"

export interface ConditionIsLocked {
	type: typeof TYPE
	value: boolean
}

function isLocked(
	this: UtilThis,
	condition: ConditionIsLocked,
	issue: UtilProps
) {
	return condition.value == issue.locked
}

export default [TYPE, isLocked] as const

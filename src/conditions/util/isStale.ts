/** @format */

import { UtilProps, UtilThis } from ".."

const TYPE = "isStale"

export interface ConditionIsStale {
	type: typeof TYPE
	value: number
}

function isStale(
	this: UtilThis,
	condition: ConditionIsStale,
	issue: UtilProps
) {
	if (!issue.lastUpdated) return false
	const last = new Date(issue.lastUpdated)
	last.setDate(last.getDate() + condition.value)
	const now = new Date()
	return last >= now
}

export default [TYPE, isStale] as const

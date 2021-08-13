/** @format */

import { UtilProps, UtilThis } from ".."

const TYPE = "isAbandoned"

export interface ConditionIsAbandoned {
	type: typeof TYPE
	value: number
	label: string
}

function isAbandoned(
	this: UtilThis,
	condition: ConditionIsAbandoned,
	issue: UtilProps
) {
	if (!issue.lastUpdated || !issue.labels?.[condition.label.toLowerCase()])
		return false
	const last = new Date(issue.lastUpdated)
	last.setDate(last.getDate() + condition.value)
	const now = new Date()
	return last >= now
}

export default [TYPE, isAbandoned] as const

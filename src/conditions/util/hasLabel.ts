/** @format */

import { UtilProps, UtilThis } from "../"

const TYPE = "hasLabel"

export interface ConditionHasLabel {
	type: typeof TYPE
	label: string
	value: boolean
}

function hasLabel(
	this: UtilThis,
	condition: ConditionHasLabel,
	issue: UtilProps
) {
	return (
		Boolean(issue.labels?.[condition.label.toLowerCase()]) == condition.value
	)
}

export default [TYPE, hasLabel] as const

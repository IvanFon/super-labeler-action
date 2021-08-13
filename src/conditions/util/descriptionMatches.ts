/** @format */

import { UtilProps, UtilThis } from "../"

const TYPE = "descriptionMatches"

export interface ConditionDescriptionMatches {
	type: typeof TYPE
	pattern: string
}

function descriptionMatches(
	this: UtilThis,
	condition: ConditionDescriptionMatches,
	issue: UtilProps
) {
	const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
	return pattern.test(issue.description)
}

export default [TYPE, descriptionMatches] as const

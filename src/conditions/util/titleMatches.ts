/** @format */

import { UtilProps, UtilThis } from "../"

const TYPE = "titleMatches"

export interface ConditionTitleMatches {
	type: typeof TYPE
	pattern: string
}

function titleMatches(
	this: UtilThis,
	condition: ConditionTitleMatches,
	issue: UtilProps
) {
	const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
	return pattern.test(issue.title)
}

export default [TYPE, titleMatches] as const

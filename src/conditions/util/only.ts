/** @format */

import {
	IssueConditionConfig,
	PRConditionConfig,
	ProjectConditionConfig,
	UtilProps,
	UtilThis
} from ".."
import { evaluator } from "../../evaluator"

const TYPE = "$only"

export interface ConditionOnlyOne {
	required: number
	type: typeof TYPE
	pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig]
}

function only(this: UtilThis, condition: ConditionOnlyOne, props: UtilProps) {
	let success = 0

	condition.pattern.forEach((condition) => {
		if (evaluator.call(this, condition, props)) success++
	})

	return success == condition.required
}

export default [TYPE, only] as const

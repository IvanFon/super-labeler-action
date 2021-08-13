/** @format */

import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import {
	getIssueConditionHandler,
	getPRConditionHandler,
	getProjectConditionHandler,
	IssueCondition,
	IssueConditionConfig,
	log,
	PRCondition,
	PRConditionConfig,
	ProjectCondition,
	ProjectConditionConfig,
	UtilProps,
	UtilThis
} from "./conditions"
import { Issues, Project, PullRequests } from "./contexts"
import { SharedConventionsConfig } from "./contexts/methods/conventions"
import { Release } from "./contexts/methods/release"

const forConditions = <
	T extends IssueCondition | PRCondition | ProjectCondition
>(
	conditions: T[],
	callback: (condition: T) => boolean
) => {
	let matches = 0
	for (const condition of conditions) {
		log(
			LoggingLevels.debug,
			`Condition: ${JSON.stringify(condition)} == ${callback(condition)}`
		)
		if (callback(condition)) {
			matches++
		}
	}
	return matches
}
/**
 * Used to evaluate the conditions.
 * @private
 */
export function evaluator(
	this: UtilThis,
	config:
		| PRConditionConfig
		| IssueConditionConfig
		| ProjectConditionConfig
		| SharedConventionsConfig
		| Release,
	props: UtilProps
) {
	const { conditions, requires } = config
	log(LoggingLevels.debug, JSON.stringify(config))
	if (typeof conditions == "string")
		throw new LoggingDataClass(
			LoggingLevels.error,
			"String can not be used to evaluate conditions"
		)
	/**
	 * TODO: fix this error
	 */
	// @ts-expect-error - an issue with conditions but dont know how to fix
	const matches = forConditions(conditions, (condition) => {
		const handler =
			props.type == "issue"
				? getIssueConditionHandler.call(
						this as Issues,
						condition as IssueCondition
				  )
				: props.type == "pr"
				? getPRConditionHandler.call(
						this as PullRequests,
						condition as PRCondition
				  )
				: getProjectConditionHandler.call(
						this as Project,
						condition as ProjectCondition
				  )
		log(LoggingLevels.debug, `The handler is ${handler?.name}`)
		// @ts-expect-error
		return handler?.call(this, condition as any, props as any) as boolean
	})
	log(LoggingLevels.debug, `Matches: ${matches}/${requires}`)
	return matches >= requires
}

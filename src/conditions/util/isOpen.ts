/** @format */

import { UtilProps, UtilThis } from "../"

const TYPE = "isOpen"

enum States {
	Open = "OPEN",
	Closed = "CLOSED"
}

export interface ConditionIsOpen {
	type: typeof TYPE
	value: boolean
}

function isOpen(this: UtilThis, condition: ConditionIsOpen, issue: UtilProps) {
	return (
		this.util.parsingData.normalize(issue.state) ===
		this.util.parsingData.normalize(
			condition.value ? States.Open : States.Closed
		)
	)
}

export default [TYPE, isOpen] as const

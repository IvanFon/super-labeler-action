/** @format */

import { PRProps } from "."
import { Issues, Project, PullRequests } from "../../contexts"

const TYPE = "pendingReview"

export interface ConditionPendingReview {
	type: typeof TYPE
	value: boolean
}

function pendingReview(
	this: Issues | PullRequests | Project,
	condition: ConditionPendingReview,
	pr: PRProps
) {
	return pr.pendingReview === condition.value
}

export default [TYPE, pendingReview] as const

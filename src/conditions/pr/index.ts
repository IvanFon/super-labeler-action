import { Issues, Project, PullRequests } from '../../contexts'
import { Condition, handlers as sharedHandlers } from '../util'
import branchMatches, { ConditionBranchMatches } from './branchMatches'
import changesSize, { ConditionChangesSize } from './changesSize'
import filesMatch, { ConditionFilesMatch } from './filesMatch'
import isApproved, { ConditionisApproved } from './isApproved'
import isDraft, { ConditionIsDraft } from './isDraft'
import pendingReview, { ConditionPendingReview } from './pendingReview'
import requestedChanges, { ConditionRequestedChanges } from './requestedChanges'

export type PRCondition =
  | Condition
  | ConditionBranchMatches
  | ConditionFilesMatch
  | ConditionIsDraft
  | ConditionChangesSize
  | ConditionPendingReview
  | ConditionRequestedChanges
  | ConditionisApproved

const handlers = [
  ...sharedHandlers,
  branchMatches,
  filesMatch,
  isDraft,
  changesSize,
  pendingReview,
  requestedChanges,
  isApproved
]

export function getPRConditionHandler(
  this: Issues | PullRequests | Project,
  condition: PRCondition
) {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler?.[1]
}

export { PRProps } from '..'

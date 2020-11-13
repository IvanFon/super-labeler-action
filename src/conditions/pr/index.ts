import branchMatches, { ConditionBranchMatches } from './branchMatches'
import filesMatch, { ConditionFilesMatch } from './filesMatch'
import isDraft, { ConditionIsDraft } from './isDraft'
import changesSize, { ConditionChangesSize } from './changesSize'
import pendingReview, { ConditionPendingReview } from './pendingReview'
import requestedChanges, { ConditionRequestedChanges } from './requestedChanges'
import isApproved, { ConditionisApproved } from './isApproved'
import { Condition, handlers as sharedHandlers } from '../'

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

export const getPRConditionHandler = (condition: PRCondition) => {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler?.[1]
}

export { PRProps } from '../'

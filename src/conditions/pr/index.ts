import branchMatches, { ConditionBranchMatches } from './branchMatches'
import filesMatch, { ConditionFilesMatch } from './filesMatch'
import isDraft, { ConditionIsDraft } from './isDraft'
import changesSize, { ConditionChangesSize } from './changesSize'
import { Condition, handlers as sharedHandlers } from '../'

export type PRCondition =
  | ConditionBranchMatches
  | ConditionFilesMatch
  | ConditionIsDraft
  | ConditionChangesSize
  | Condition

const handlers = [
  ...sharedHandlers,
  branchMatches,
  filesMatch,
  isDraft,
  changesSize
]

export const getPRConditionHandler = (condition: PRCondition) => {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler?.[1]
}

export { PRProps } from '../'

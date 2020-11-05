import branchMatches, { ConditionBranchMatches } from './branchMatches'
import filesMatch, { ConditionFilesMatch } from './filesMatch'
import isDraft, { ConditionIsDraft } from './isDraft'
import { Condition, handlers as sharedHandlers } from '../'

export type PRCondition =
  | ConditionBranchMatches
  | ConditionFilesMatch
  | ConditionIsDraft
  | Condition

const handlers = [...sharedHandlers, branchMatches, filesMatch, isDraft]

export const getPRConditionHandler = (condition: PRCondition) => {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler?.[1]
}

export { PRProps } from '../../parseContext'

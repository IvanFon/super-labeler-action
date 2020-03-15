import branchMatches, { ConditionBranchMatches } from './branchMatches';
import isDraft, { ConditionIsDraft } from './isDraft';
import { Condition, handlers as sharedHandlers } from '../';

export type PRCondition = ConditionBranchMatches | ConditionIsDraft | Condition;

const handlers = [...sharedHandlers, branchMatches, isDraft];

export const getPRConditionHandler = (condition: PRCondition) => {
  const handler = handlers.find((handler) => handler[0] === condition.type);
  return handler?.[1];
};

export { PRProps } from 'src/parseContext';

import branchMatches, { ConditionBranchMatches } from './branchMatches';
import isDraft, { ConditionIsDraft } from './isDraft';

export type Condition = ConditionBranchMatches | ConditionIsDraft;

const handlers = [branchMatches, isDraft];

export const getConditionHandler = (condition: Condition) => {
  const handler = handlers.find((handler) => handler[0] === condition.type);
  return handler?.[1];
};

export { PRProps } from 'src/parseContext';

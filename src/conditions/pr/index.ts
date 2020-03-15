import branchMatches, { ConditionBranchMatches } from './branchMatches';
import isDraft, { ConditionIsDraft } from './isDraft';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition =
  | ConditionBranchMatches
  | ConditionIsDraft
  | ConditionTitleMatches;

const handlers = [branchMatches, isDraft, titleMatches];

export const getConditionHandler = (condition: Condition) => {
  const handler = handlers.find((handler) => handler[0] === condition.type);
  return handler?.[1];
};

export { PRProps } from 'src/parseContext';

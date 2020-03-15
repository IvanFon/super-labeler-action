import branchMatches, { ConditionBranchMatches } from './branchMatches';
import descriptionMatches, {
  ConditionDescriptionMatches,
} from './descriptionMatches';
import isDraft, { ConditionIsDraft } from './isDraft';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition =
  | ConditionBranchMatches
  | ConditionDescriptionMatches
  | ConditionIsDraft
  | ConditionTitleMatches;

const handlers = [branchMatches, descriptionMatches, isDraft, titleMatches];

export const getConditionHandler = (condition: Condition) => {
  const handler = handlers.find((handler) => handler[0] === condition.type);
  return handler?.[1];
};

export { PRProps } from 'src/parseContext';

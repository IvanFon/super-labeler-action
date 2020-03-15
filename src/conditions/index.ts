import descriptionMatches, {
  ConditionDescriptionMatches,
} from './descriptionMatches';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition = ConditionDescriptionMatches | ConditionTitleMatches;

export const handlers = [descriptionMatches, titleMatches];

export { IssueProps, PRProps } from '../parseContext';

export * from './issue';
export * from './pr';

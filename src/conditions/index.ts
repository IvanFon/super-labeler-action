import descriptionMatches, {
  ConditionDescriptionMatches,
} from './descriptionMatches';
import isOpen, { ConditionIsOpen } from './isOpen';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition =
  | ConditionDescriptionMatches
  | ConditionIsOpen
  | ConditionTitleMatches;

export const handlers = [descriptionMatches, isOpen, titleMatches];

export { IssueProps, PRProps } from '../parseContext';

export * from './issue';
export * from './pr';

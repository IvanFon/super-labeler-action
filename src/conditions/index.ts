import descriptionMatches, {
  ConditionDescriptionMatches,
} from './descriptionMatches';
import isClosed, { ConditionIsClosed } from './isClosed';
import isOpen, { ConditionIsOpen } from './isOpen';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition =
  | ConditionDescriptionMatches
  | ConditionIsClosed
  | ConditionIsOpen
  | ConditionTitleMatches;

export const handlers = [descriptionMatches, isClosed, isOpen, titleMatches];

export { IssueProps, PRProps } from '../parseContext';

export * from './issue';
export * from './pr';

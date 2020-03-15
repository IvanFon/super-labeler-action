import creatorMatches, { ConditionCreatorMatches } from './creatorMatches';
import descriptionMatches, {
  ConditionDescriptionMatches,
} from './descriptionMatches';
import isOpen, { ConditionIsOpen } from './isOpen';
import titleMatches, { ConditionTitleMatches } from './titleMatches';

export type Condition =
  | ConditionCreatorMatches
  | ConditionDescriptionMatches
  | ConditionIsOpen
  | ConditionTitleMatches;

export const handlers = [
  creatorMatches,
  descriptionMatches,
  isOpen,
  titleMatches,
];

export { IssueProps, PRProps } from '../parseContext';

export * from './issue';
export * from './pr';

import creatorMatches, { ConditionCreatorMatches } from './creatorMatches'
import descriptionMatches, {
  ConditionDescriptionMatches
} from './descriptionMatches'
import isLocked, { ConditionIsLocked } from './isLocked'
import isOpen, { ConditionIsOpen } from './isOpen'
import titleMatches, { ConditionTitleMatches } from './titleMatches'

export type Condition =
  | ConditionCreatorMatches
  | ConditionDescriptionMatches
  | ConditionIsLocked
  | ConditionIsOpen
  | ConditionTitleMatches

export const handlers = [
  creatorMatches,
  descriptionMatches,
  isLocked,
  isOpen,
  titleMatches
]

export { IssueProps, PRProps } from '../parseContext'

export * from './issue'
export * from './pr'

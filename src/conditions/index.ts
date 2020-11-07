import creatorMatches, { ConditionCreatorMatches } from './util/creatorMatches'
import descriptionMatches, {
  ConditionDescriptionMatches
} from './util/descriptionMatches'
import isLocked, { ConditionIsLocked } from './util/isLocked'
import isOpen, { ConditionIsOpen } from './util/isOpen'
import titleMatches, { ConditionTitleMatches } from './util/titleMatches'

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

export { IssueProps, PRProps } from '../types'

export * from './issue'
export * from './pr'

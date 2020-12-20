import and, { ConditionAnd } from './and'
import creatorMatches, { ConditionCreatorMatches } from './creatorMatches'
import descriptionMatches, {
  ConditionDescriptionMatches
} from './descriptionMatches'
import hasLabel, { ConditionHasLabel } from './hasLabel'
import isOpen, { ConditionIsOpen } from './isOpen'
import or, { ConditionOr } from './or'
import titleMatches, { ConditionTitleMatches } from './titleMatches'

export type Condition =
  | ConditionCreatorMatches
  | ConditionDescriptionMatches
  | ConditionIsOpen
  | ConditionTitleMatches
  | ConditionHasLabel
  | ConditionOr
  | ConditionAnd

export const handlers = [
  creatorMatches,
  descriptionMatches,
  isOpen,
  hasLabel,
  titleMatches,
  and,
  or
]

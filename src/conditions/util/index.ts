/** @format */

import and, { ConditionAnd } from "./and"
import creatorMatches, { ConditionCreatorMatches } from "./creatorMatches"
import descriptionMatches, {
	ConditionDescriptionMatches
} from "./descriptionMatches"
import hasLabel, { ConditionHasLabel } from "./hasLabel"
import isAbandoned, { ConditionIsAbandoned } from "./isAbandoned"
import isOpen, { ConditionIsOpen } from "./isOpen"
import isStale, { ConditionIsStale } from "./isStale"
import only, { ConditionOnlyOne } from "./only"
import or, { ConditionOr } from "./or"
import titleMatches, { ConditionTitleMatches } from "./titleMatches"

/**
 * @private
 */
export type Condition =
	| ConditionCreatorMatches
	| ConditionDescriptionMatches
	| ConditionIsOpen
	| ConditionTitleMatches
	| ConditionHasLabel
	| ConditionIsStale
	| ConditionIsAbandoned
	| ConditionOr
	| ConditionAnd
	| ConditionOnlyOne

/**
 * The utility condition handler.
 * @private
 */
export const handlers = [
	creatorMatches,
	descriptionMatches,
	isOpen,
	isStale,
	isAbandoned,
	hasLabel,
	titleMatches,
	and,
	or,
	only
]

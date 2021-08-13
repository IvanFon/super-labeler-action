import { ConditionAnd } from "./and";
import { ConditionCreatorMatches } from "./creatorMatches";
import { ConditionDescriptionMatches } from "./descriptionMatches";
import { ConditionHasLabel } from "./hasLabel";
import { ConditionIsAbandoned } from "./isAbandoned";
import { ConditionIsOpen } from "./isOpen";
import { ConditionIsStale } from "./isStale";
import { ConditionOnlyOne } from "./only";
import { ConditionOr } from "./or";
import { ConditionTitleMatches } from "./titleMatches";
export declare type Condition = ConditionCreatorMatches | ConditionDescriptionMatches | ConditionIsOpen | ConditionTitleMatches | ConditionHasLabel | ConditionIsStale | ConditionIsAbandoned | ConditionOr | ConditionAnd | ConditionOnlyOne;
export declare const handlers: (readonly ["creatorMatches", (this: import("..").UtilThis, condition: ConditionCreatorMatches, issue: import("..").UtilProps) => boolean] | readonly ["descriptionMatches", (this: import("..").UtilThis, condition: ConditionDescriptionMatches, issue: import("..").UtilProps) => boolean] | readonly ["isOpen", (this: import("..").UtilThis, condition: ConditionIsOpen, issue: import("..").UtilProps) => boolean] | readonly ["isStale", (this: import("..").UtilThis, condition: ConditionIsStale, issue: import("..").UtilProps) => boolean] | readonly ["isAbandoned", (this: import("..").UtilThis, condition: ConditionIsAbandoned, issue: import("..").UtilProps) => boolean] | readonly ["hasLabel", (this: import("..").UtilThis, condition: ConditionHasLabel, issue: import("..").UtilProps) => boolean] | readonly ["titleMatches", (this: import("..").UtilThis, condition: ConditionTitleMatches, issue: import("..").UtilProps) => boolean] | readonly ["$and", (this: import("..").UtilThis, condition: ConditionAnd, props: import("..").UtilProps) => boolean] | readonly ["$or", (this: import("..").UtilThis, condition: ConditionOr, props: import("..").UtilProps) => boolean] | readonly ["$only", (this: import("..").UtilThis, condition: ConditionOnlyOne, props: import("..").UtilProps) => boolean])[];
//# sourceMappingURL=index.d.ts.map
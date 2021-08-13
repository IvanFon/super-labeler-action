import { UtilProps, UtilThis } from "../";
declare const TYPE = "descriptionMatches";
export interface ConditionDescriptionMatches {
    type: typeof TYPE;
    pattern: string;
}
declare function descriptionMatches(this: UtilThis, condition: ConditionDescriptionMatches, issue: UtilProps): boolean;
declare const _default: readonly ["descriptionMatches", typeof descriptionMatches];
export default _default;
//# sourceMappingURL=descriptionMatches.d.ts.map
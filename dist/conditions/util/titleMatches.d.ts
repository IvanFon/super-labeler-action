import { UtilProps, UtilThis } from "../";
declare const TYPE = "titleMatches";
export interface ConditionTitleMatches {
    type: typeof TYPE;
    pattern: string;
}
declare function titleMatches(this: UtilThis, condition: ConditionTitleMatches, issue: UtilProps): boolean;
declare const _default: readonly ["titleMatches", typeof titleMatches];
export default _default;
//# sourceMappingURL=titleMatches.d.ts.map
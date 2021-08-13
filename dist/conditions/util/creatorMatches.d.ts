import { UtilProps, UtilThis } from "../";
declare const TYPE = "creatorMatches";
export interface ConditionCreatorMatches {
    type: typeof TYPE;
    pattern: string;
}
declare function creatorMatches(this: UtilThis, condition: ConditionCreatorMatches, issue: UtilProps): boolean;
declare const _default: readonly ["creatorMatches", typeof creatorMatches];
export default _default;
//# sourceMappingURL=creatorMatches.d.ts.map
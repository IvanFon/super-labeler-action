import { UtilProps, UtilThis } from "../";
;
declare const TYPE = "$and";
export interface ConditionAnd {
    type: typeof TYPE;
    pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig];
}
declare function and(this: UtilThis, condition: ConditionAnd, props: UtilProps): boolean;
declare const _default: readonly ["$and", typeof and];
export default _default;
//# sourceMappingURL=and.d.ts.map
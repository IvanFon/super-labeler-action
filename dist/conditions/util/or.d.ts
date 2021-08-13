import { UtilProps, UtilThis } from "../";
;
declare const TYPE = "$or";
export interface ConditionOr {
    type: typeof TYPE;
    pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig];
}
declare function or(this: UtilThis, condition: ConditionOr, props: UtilProps): boolean;
declare const _default: readonly ["$or", typeof or];
export default _default;
//# sourceMappingURL=or.d.ts.map
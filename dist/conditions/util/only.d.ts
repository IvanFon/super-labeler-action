import { UtilProps, UtilThis } from "..";
;
declare const TYPE = "$only";
export interface ConditionOnlyOne {
    required: number;
    type: typeof TYPE;
    pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig];
}
declare function only(this: UtilThis, condition: ConditionOnlyOne, props: UtilProps): boolean;
declare const _default: readonly ["$only", typeof only];
export default _default;
//# sourceMappingURL=only.d.ts.map
import { UtilProps, UtilThis } from "..";
declare const TYPE = "isLocked";
export interface ConditionIsLocked {
    type: typeof TYPE;
    value: boolean;
}
declare function isLocked(this: UtilThis, condition: ConditionIsLocked, issue: UtilProps): boolean;
declare const _default: readonly ["isLocked", typeof isLocked];
export default _default;
//# sourceMappingURL=isLocked.d.ts.map
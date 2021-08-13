import { UtilProps, UtilThis } from "..";
declare const TYPE = "isStale";
export interface ConditionIsStale {
    type: typeof TYPE;
    value: number;
}
declare function isStale(this: UtilThis, condition: ConditionIsStale, issue: UtilProps): boolean;
declare const _default: readonly ["isStale", typeof isStale];
export default _default;
//# sourceMappingURL=isStale.d.ts.map
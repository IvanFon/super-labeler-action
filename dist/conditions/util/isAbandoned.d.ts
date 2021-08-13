import { UtilProps, UtilThis } from "..";
declare const TYPE = "isAbandoned";
export interface ConditionIsAbandoned {
    type: typeof TYPE;
    value: number;
    label: string;
}
declare function isAbandoned(this: UtilThis, condition: ConditionIsAbandoned, issue: UtilProps): boolean;
declare const _default: readonly ["isAbandoned", typeof isAbandoned];
export default _default;
//# sourceMappingURL=isAbandoned.d.ts.map
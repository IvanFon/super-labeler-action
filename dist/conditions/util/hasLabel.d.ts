import { UtilProps, UtilThis } from "../";
declare const TYPE = "hasLabel";
export interface ConditionHasLabel {
    type: typeof TYPE;
    label: string;
    value: boolean;
}
declare function hasLabel(this: UtilThis, condition: ConditionHasLabel, issue: UtilProps): boolean;
declare const _default: readonly ["hasLabel", typeof hasLabel];
export default _default;
//# sourceMappingURL=hasLabel.d.ts.map
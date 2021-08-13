import { UtilProps, UtilThis } from "../";
declare const TYPE = "isOpen";
export interface ConditionIsOpen {
    type: typeof TYPE;
    value: boolean;
}
declare function isOpen(this: UtilThis, condition: ConditionIsOpen, issue: UtilProps): boolean;
declare const _default: readonly ["isOpen", typeof isOpen];
export default _default;
//# sourceMappingURL=isOpen.d.ts.map
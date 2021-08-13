import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "isApproved";
export interface ConditionisApproved {
    type: typeof TYPE;
    value: boolean;
    required?: number;
}
declare function isApproved(this: Issues | PullRequests | Project, condition: ConditionisApproved, pr: PRProps): boolean;
declare const _default: readonly ["isApproved", typeof isApproved];
export default _default;
//# sourceMappingURL=isApproved.d.ts.map
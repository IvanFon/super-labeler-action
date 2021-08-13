import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "pendingReview";
export interface ConditionPendingReview {
    type: typeof TYPE;
    value: boolean;
}
declare function pendingReview(this: Issues | PullRequests | Project, condition: ConditionPendingReview, pr: PRProps): boolean;
declare const _default: readonly ["pendingReview", typeof pendingReview];
export default _default;
//# sourceMappingURL=pendingReview.d.ts.map
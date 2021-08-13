import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "isDraft";
export interface ConditionIsDraft {
    type: typeof TYPE;
    value: boolean;
}
declare function isDraft(this: Issues | PullRequests | Project, condition: ConditionIsDraft, pr: PRProps): boolean;
declare const _default: readonly ["isDraft", typeof isDraft];
export default _default;
//# sourceMappingURL=isDraft.d.ts.map
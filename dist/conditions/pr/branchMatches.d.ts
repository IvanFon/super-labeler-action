import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "branchMatches";
export interface ConditionBranchMatches {
    type: typeof TYPE;
    pattern: string;
}
declare function branchMatches(this: Issues | PullRequests | Project, condition: ConditionBranchMatches, pr: PRProps): boolean;
declare const _default: readonly ["branchMatches", typeof branchMatches];
export default _default;
//# sourceMappingURL=branchMatches.d.ts.map
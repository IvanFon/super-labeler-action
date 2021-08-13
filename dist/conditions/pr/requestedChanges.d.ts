import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "requestedChanges";
export interface ConditionRequestedChanges {
    type: typeof TYPE;
    value: boolean;
}
declare function requestedChanges(this: Issues | PullRequests | Project, condition: ConditionRequestedChanges, pr: PRProps): boolean;
declare const _default: readonly ["requestedChanges", typeof requestedChanges];
export default _default;
//# sourceMappingURL=requestedChanges.d.ts.map
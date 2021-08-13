import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "changesSize";
export interface ConditionChangesSize {
    type: typeof TYPE;
    min: number;
    max?: number;
}
declare function changesSize(this: Issues | PullRequests | Project, condition: ConditionChangesSize, pr: PRProps): boolean;
declare const _default: readonly ["changesSize", typeof changesSize];
export default _default;
//# sourceMappingURL=changesSize.d.ts.map
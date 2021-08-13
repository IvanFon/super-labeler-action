import { PRProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "filesMatch";
export interface ConditionFilesMatch {
    type: typeof TYPE;
    glob: string;
}
declare function filesMatch(this: Issues | PullRequests | Project, condition: ConditionFilesMatch, pr: PRProps): boolean;
declare const _default: readonly ["filesMatch", typeof filesMatch];
export default _default;
//# sourceMappingURL=filesMatch.d.ts.map
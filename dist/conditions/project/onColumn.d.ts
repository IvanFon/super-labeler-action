import { ProjectProps } from ".";
import { Issues, Project, PullRequests } from "../../contexts";
declare const TYPE = "onColumn";
export interface ConditiononColumn {
    type: typeof TYPE;
    project: string;
    column: string;
}
declare function onColumn(this: Issues | PullRequests | Project, condition: ConditiononColumn, pr: ProjectProps): boolean;
declare const _default: readonly ["onColumn", typeof onColumn];
export default _default;
//# sourceMappingURL=onColumn.d.ts.map
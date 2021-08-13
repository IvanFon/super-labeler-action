import { Issues, Project, PullRequests, Schedule } from "..";
;
import { CurContext, IssueContext, PRContext, ProjectContext, ScheduleContext, UtilThis, Version } from "../../conditions";
import { Utils } from "../../utils";
export { log } from "../..";
export declare class Contexts {
    runners: Runners;
    configs: Config;
    config: PullRequestConfig | IssueConfig | ProjectConfig;
    curContext: CurContext;
    context: ProjectContext | IssueContext | PRContext | Partial<ScheduleContext>;
    newVersion: Version;
    util: Utils;
    dryRun: boolean;
    constructor(util: Utils, runners: Runners, configs: Config, curContext: CurContext, dryRun: boolean);
    syncRemoteProject: (that: Project) => Promise<void>;
    assignProject: (that: Issues | PullRequests) => Promise<void>;
    applyLabels: (that: UtilThis) => Promise<void>;
    checkStale: (that: Issues | PullRequests | Project | Schedule) => Promise<void>;
    conventions: {
        enforce: (that: Issues | PullRequests | Project) => boolean;
    };
}
//# sourceMappingURL=index.d.ts.map
/// <reference types="node" />
import { Context } from "vm";
import { Config, PullRequestConfig, Release, Runners } from "../../types";
import { CurContext, PRContext } from "../conditions";
import { Utils } from "../utils";
import { Contexts } from "./methods";
export declare class PullRequests extends Contexts {
    context: PRContext;
    config: PullRequestConfig;
    constructor(util: Utils, runners: Runners, configs: Config, curContext: CurContext, dryRun: boolean);
    static parse(utils: Utils, config: Config, context: Context): Promise<PRContext | undefined>;
    run(attempt?: number): Promise<void>;
    automaticApprove(automaticApprove: PullRequestConfig["automaticApprove"]): void;
    bumpVersion(labels: Release["labels"]): void;
}
//# sourceMappingURL=pullRequests.d.ts.map
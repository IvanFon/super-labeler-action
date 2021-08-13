/// <reference types="node" />
import { Context } from "vm";
import { Config, IssueConfig, Runners } from "../../types";
import { CurContext, IssueContext } from "../conditions";
import { Utils } from "../utils";
import { Contexts } from "./methods";
export declare class Issues extends Contexts {
    context: IssueContext;
    config: IssueConfig;
    constructor(util: Utils, runners: Runners, configs: Config, curContext: CurContext, dryRun: boolean);
    static parse(utils: Utils, config: Config, context: Context): Promise<IssueContext | undefined>;
    run(attempt?: number): Promise<void>;
}
//# sourceMappingURL=issues.d.ts.map
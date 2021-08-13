/// <reference types="node" />
import { Context } from "vm";
import { Column, Config, ProjectConfig, Runners } from "../../types";
import { CurContext, ProjectContext } from "../conditions";
import { Utils } from "../utils";
import { Contexts } from "./methods";
export declare class Project extends Contexts {
    context: ProjectContext;
    config: ProjectConfig;
    constructor(util: Utils, runners: Runners, configs: Config, curContext: CurContext, dryRun: boolean);
    static parse(utils: Utils, config: Config, context: Context): Promise<ProjectContext | undefined>;
    run(attempt?: number): Promise<void>;
    convertColumnStringsToIDArray(columns: Column[]): Promise<number[]>;
}
//# sourceMappingURL=projects.d.ts.map
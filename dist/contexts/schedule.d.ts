import { Context } from "@actions/github/lib/context";
import { Config, Runners, ScheduleConfig } from "../../types";
import { CurContext, ScheduleContext } from "../conditions";
import { Utils } from "../utils";
import { Contexts } from "./methods";
export declare class Schedule extends Contexts {
    context: ScheduleContext;
    ctx: ScheduleContext;
    config: ScheduleConfig;
    constructor(util: Utils, runners: Runners, configs: Config, curContext: CurContext, dryRun: boolean);
    static parse(context: Context): Promise<ScheduleContext | undefined>;
    run(attempt?: number): Promise<void>;
}
//# sourceMappingURL=schedule.d.ts.map
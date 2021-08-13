import { GitHub } from "@actions/github";
import { Config, Options, Runners } from "../types";
import { CurContext } from "./conditions";
import { Utils } from "./utils";
export default class Action {
    client: GitHub;
    opts: Options;
    configJSON: Options["configJSON"];
    configPath: Options["configPath"];
    dryRun: Options["dryRun"];
    fillEmpty: Options["fillEmpty"];
    repo: {
        owner: string;
        repo: string;
    };
    util: Utils;
    constructor(client: GitHub, options: Options);
    run(): Promise<void>;
    processConfig(): Promise<Runners>;
    processContext(config: Config): Promise<CurContext>;
    syncLabels(config: Runners): Promise<void>;
    applyContext(runners: Runners, config: Config, curContext: CurContext): void;
}

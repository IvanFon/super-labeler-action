import { IssueConditionConfig, PRConditionConfig, ProjectConditionConfig, Release, SharedConventionsConfig } from "../types";
import { UtilProps, UtilThis } from "./conditions";
export declare function evaluator(this: UtilThis, config: PRConditionConfig | IssueConditionConfig | ProjectConditionConfig | SharedConventionsConfig | Release, props: UtilProps): boolean;

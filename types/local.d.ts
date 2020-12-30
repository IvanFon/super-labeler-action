import { SharedConditions, IssueConditionConfig, PRConditionConfig } from ".";
import { Condition } from "../src/conditions";

export interface SharedLabels {
    [key: string]: SharedConditions
}
export interface IssueConfig {
    ref?: string
    labels?: {
        [key: string]: IssueConditionConfig
    }
}
export interface PullRequestConfig {
    ref?: string
    labels?: {
        [key: string]: PRConditionConfig
    }
}
export interface ProjectConfig {
    ref?: string
    labels?: {
        [key: string]: SharedLabelConfig
    }
}

export interface SharedLabelConfig {
    requires: number
    conditions: Condition[]
}

export interface SharedConfig {
    labels?: SharedLabels
}
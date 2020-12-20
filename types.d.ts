import {
  IssueCondition,
  PRCondition,
  Condition,
  ProjectCondition
} from './src/conditions/'

export interface IssueConditionConfig {
  requires: number
  conditions: IssueCondition[]
}

export interface PRConditionConfig {
  requires: number
  conditions: PRCondition[]
}

export interface SharedConfig {
  requires: number
  conditions: Condition[]
}

export interface Runners {
  labels?: Labels
  runners: Config[]
}

export interface Config {
  root: string
  projectType: ProjectType
  versioning?: VersionType
  labels?: { [key: string]: string }
  sharedConfig: {
    labels: SharedLabels
  }
  issue: IssueConfig
  pr: PullRequestConfig
  project: ProjectConfig
  skip_labeling: string
  delete_labels: boolean
}

interface SharedLabels {
  [key: string]: SharedConditions
}
export interface SharedConditions {
  requires: number
  conditions: Condition[]
}
export interface IssueConfig {
  ref?: string
  labels: {
    [key: string]: IssueConditionConfig
  }
}
export interface PullRequestConfig {
  ref?: string
  labels: {
    [key: string]: PRConditionConfig
  }
}
export interface ProjectConfig {
  ref?: string
  labels: {
    [key: string]: SharedConfig
  }
}
export interface ProjectConditionConfig {
  requires: number
  conditions: ProjectCondition[]
}
export interface Label {
  name: string
  description: string
  color: string
}

export interface Labels {
  [key: string]: Label
}

export interface Options {
  configPath: string
  configJSON: Runners
  showLogs: boolean
  dryRun: boolean
}

export type ProjectType = 'node' | 'other'
export type VersionType = 'SemVer'

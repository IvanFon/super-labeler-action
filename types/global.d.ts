import { IssueConfig, ProjectConfig, PullRequestConfig, SharedConfig } from '.'
import {
  Condition,
  IssueCondition,
  PRCondition,
  ProjectCondition
} from '../src/conditions'

/**
 * Application interfaces
 */

export interface Options {
  configPath: string
  configJSON: Runners
  showLogs: boolean
  dryRun: boolean
  fillEmpty: boolean
  skipDelete: boolean
}

export interface Runners {
  labels?: Labels
  runners: Config[]
}

export interface Config {
  root: string
  versioning: {
    source: VersionSource
    type?: VersionType
  }
  retryLimit?: number
  prereleaseName?: string
  labels?: { [key: string]: string }
  sharedConfig?: SharedConfig
  pr?: PullRequestConfig
  issue?: IssueConfig
  project?: ProjectConfig
}

/**
 * Config types
 */

export type VersionSource = 'node' | 'milestones' | string
export type VersionType = 'SemVer'

export interface SharedConditions {
  requires: number
  conditions: Condition[]
}

export interface Label {
  name: string
  description: string
  color: string
}

export interface Labels {
  [key: string]: Label
}

export interface PRConditionConfig {
  requires: number
  conditions: PRCondition[]
}

export interface IssueConditionConfig {
  requires: number
  conditions: IssueCondition[]
}

export interface ProjectConditionConfig {
  requires: number
  conditions: ProjectCondition[]
}

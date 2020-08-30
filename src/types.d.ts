import { IssueCondition, PRCondition } from './conditions'

export interface IssueConditionConfig {
  requires: number
  conditions: IssueCondition[]
}

export interface PRConditionConfig {
  requires: number
  conditions: PRCondition[]
}

export interface Config {
  labels: {
    [key: string]: {
      name: string
      color: string
      description: string
    }
  }
  issue: {
    [key: string]: IssueConditionConfig
  }
  pr: {
    [key: string]: PRConditionConfig
  }
  skip_labeling: string
}

export interface Options {
  configPath: string
  showLogs: boolean
  dryRun: boolean
}

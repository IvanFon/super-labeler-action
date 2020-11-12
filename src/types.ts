import { IssueCondition, PRCondition } from './conditions/'

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
  delete_labels: boolean
}

interface Props {
  creator: string
  description: string
  locked: boolean
  state: 'open' | 'closed'
  title: string
}

export interface PRProps extends Props {
  branch: string
  isDraft: boolean
  files: string[]
}

export interface IssueProps extends Props {}

export interface Label {
  name: string
  description: string
  color: string
}

export type Labels = Label[]

interface GeneralContext {
  labels: Labels
  IDNumber: number
}

export interface PRContext extends GeneralContext {
  prProps: PRProps
}

export interface IssueContext extends GeneralContext {
  issueProps: IssueProps
}

export interface Options {
  configPath: string
  configJSON: Config
  showLogs: boolean
  dryRun: boolean
}

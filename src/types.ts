import { IssueCondition, PRCondition, Condition } from './conditions/'

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

export type CurContext =
  | { type: 'pr'; context: PRContext }
  | { type: 'issue'; context: IssueContext }

export type labelIdToName = { [Key: string]: string }

export interface Config {
  labels: {
    [key: string]: {
      name: string
      color: string
      description: string
    }
  }
  shared: {
    [key: string]: SharedConfig
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
  reviews: Reviews
  pendingReview: boolean
  requestedChanges: number
  approved: number
  changes: number
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

export type Reviews = Review[]

export interface Review {
  id?: number
  node_id?: string
  user?: any
  body?: string
  state?: 'APPROVED' | '' | string
  html_url?: string
  pull_request_url?: string
  author_association?: string
  _links?: {}
  submitted_at?: string
  commit_id?: string
}

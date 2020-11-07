import { IssueProps, PRProps } from '../'

const TYPE = 'isLocked'

export interface ConditionIsLocked {
  type: typeof TYPE
  value: boolean
}

const isLocked = (condition: ConditionIsLocked, issue: IssueProps | PRProps) =>
  issue.locked === condition.value

export default [TYPE, isLocked] as const

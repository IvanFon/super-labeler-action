import { IssueProps, ProjectProps, PRProps } from '..'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'isLocked'

export interface ConditionIsLocked {
  type: typeof TYPE
  value: boolean
}

function isLocked(
  this: Issues | PullRequests | Project,
  condition: ConditionIsLocked,
  issue: IssueProps | PRProps | ProjectProps
) {
  return condition.value == issue.locked
}

export default [TYPE, isLocked] as const

import { IssueProps, ProjectProps, PRProps } from '../'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'hasLabel'

export interface ConditionHasLabel {
  type: typeof TYPE
  label: string
  value: boolean
}

function hasLabel(
  this: Issues | PullRequests | Project,
  condition: ConditionHasLabel,
  issue: IssueProps | PRProps | ProjectProps
) {
  return (
    Boolean(issue.labels?.[condition.label.toLowerCase()]) == condition.value
  )
}

export default [TYPE, hasLabel] as const

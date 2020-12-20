import { PRProps } from '.'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'isDraft'

export interface ConditionIsDraft {
  type: typeof TYPE
  value: boolean
}

function isDraft(
  this: Issues | PullRequests | Project,
  condition: ConditionIsDraft,
  pr: PRProps
) {
  return pr.isDraft === condition.value
}

export default [TYPE, isDraft] as const

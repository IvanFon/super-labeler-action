import { PRProps } from '.'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'requestedChanges'

export interface ConditionRequestedChanges {
  type: typeof TYPE
  value: boolean
}

function requestedChanges(
  this: Issues | PullRequests | Project,
  condition: ConditionRequestedChanges,
  pr: PRProps
) {
  return pr.requestedChanges > pr.approved
}

export default [TYPE, requestedChanges] as const

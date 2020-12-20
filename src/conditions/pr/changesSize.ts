import { PRProps } from '.'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'changesSize'

export interface ConditionChangesSize {
  type: typeof TYPE
  min: number
  max?: number
}

function changesSize(
  this: Issues | PullRequests | Project,
  condition: ConditionChangesSize,
  pr: PRProps
) {
  if (
    pr.changes >= condition.min &&
    ((condition.max && pr.changes < condition.max) || !condition.max)
  ) {
    return true
  }
  return false
}

export default [TYPE, changesSize] as const

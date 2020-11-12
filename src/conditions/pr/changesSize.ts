import { PRProps } from '.'
import { log } from '..'

const TYPE = 'changesSize'

export interface ConditionChangesSize {
  type: typeof TYPE
  min: number
  max?: number
}

const changesSize = (condition: ConditionChangesSize, pr: PRProps) => {
  log(`PR Changes=${pr.changes} Max=${condition.max}`, 1)
  if (
    pr.changes >= condition.min &&
    ((condition.max && pr.changes < condition.max) || !condition.max)
  ) {
    return true
  }
  return false
}

export default [TYPE, changesSize] as const

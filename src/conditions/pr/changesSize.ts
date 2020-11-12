import { PRProps } from '.'
import { log } from '..'
const TYPE = 'changesSize'

export interface ConditionChangesSize {
  type: typeof TYPE
  min: number
  max: number
}

const changesSize = (condition: ConditionChangesSize, pr: PRProps) => {
  log(
    `PR Changes=${pr.changes} Min=${condition.min}| Greater=${
      pr.changes >= condition.min
    } Max=${condition.max} Less=${
      condition.max < pr.changes || !condition.max
    }`,
    1
  )
  if (
    pr.changes >= condition.min &&
    (condition.max < pr.changes || !condition.max)
  ) {
    return true
  }
  return false
}

export default [TYPE, changesSize] as const

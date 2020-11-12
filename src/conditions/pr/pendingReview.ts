import { PRProps } from '.'

const TYPE = 'pendingReview'

export interface ConditionPendingReview {
  type: typeof TYPE
  value: boolean
}

const pendingReview = (condition: ConditionPendingReview, pr: PRProps) => {
  return pr.pendingReview === condition.value
}

export default [TYPE, pendingReview] as const

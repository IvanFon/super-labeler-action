import { PRProps } from '.'

const TYPE = 'requestedChanges'

export interface ConditionRequestedChanges {
  type: typeof TYPE
  value: boolean
}

const requestedChanges = (
  condition: ConditionRequestedChanges,
  pr: PRProps
) => {
  return pr.requestedChanges > pr.approved
}

export default [TYPE, requestedChanges] as const

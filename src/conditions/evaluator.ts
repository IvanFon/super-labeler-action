import { IssueConditionConfig, PRConditionConfig } from '../types'
import {
  log,
  IssueCondition,
  PRCondition,
  getIssueConditionHandler,
  getPRConditionHandler
} from './index'

import { PRProps, IssueProps } from '.'

export enum ConditionSetType {
  issue = 'issue',
  pr = 'pr'
}

const forConditions = <T extends IssueCondition | PRCondition>(
  conditions: T[],
  callback: (condition: T) => boolean
) => {
  let matches = 0
  for (const condition of conditions) {
    log(`Condition: ${JSON.stringify(condition)}`, 1)
    if (callback(condition)) {
      matches++
    }
  }
  return matches
}

export default function evaluator(
  conditionSetType: ConditionSetType,
  config: PRConditionConfig | IssueConditionConfig,
  props: PRProps | IssueProps
) {
  const { conditions, requires } = config

  const matches = forConditions(conditions, condition => {
    const handler =
      conditionSetType === ConditionSetType.issue
        ? getIssueConditionHandler(condition as IssueCondition)
        : getPRConditionHandler(condition as PRCondition)
    return handler?.(condition as any, props as any) || false
  })
  log(`Matches: ${matches}/${requires}`, 1)
  return matches >= requires
}

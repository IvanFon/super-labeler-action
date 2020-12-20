import { IssueProps, ProjectProps, PRProps } from '../'
import {
  IssueConditionConfig,
  PRConditionConfig,
  ProjectConditionConfig
} from '../../../types'
import { Issues, Project, PullRequests } from '../../contexts'
import { evaluator } from '../../evaluator'
const TYPE = '$and'

export interface ConditionAnd {
  type: typeof TYPE
  pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig]
}

function and(
  this: Issues | PullRequests | Project,
  condition: ConditionAnd,
  props: IssueProps | PRProps | ProjectProps
) {
  let success: number = 0
  condition.pattern.forEach(condition => {
    if (evaluator.call(this, condition, props)) success++
  })

  return success == condition.pattern.length
}

export default [TYPE, and] as const

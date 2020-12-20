import { IssueProps, ProjectProps, PRProps } from '../'
import {
  IssueConditionConfig,
  PRConditionConfig,
  ProjectConditionConfig
} from '../../../types'
import { Issues, Project, PullRequests } from '../../contexts'
import { evaluator } from '../../evaluator'
const TYPE = '$or'

export interface ConditionOr {
  type: typeof TYPE
  pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig]
}

function or(
  this: Issues | PullRequests | Project,
  condition: ConditionOr,
  props: IssueProps | PRProps | ProjectProps
) {
  let success: boolean = false

  condition.pattern.forEach(condition => {
    if (evaluator.call(this, condition, props)) success = true
  })

  return success
}

export default [TYPE, or] as const

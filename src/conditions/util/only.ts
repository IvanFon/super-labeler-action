import { IssueProps, ProjectProps, PRProps } from '..'
import {
  IssueConditionConfig,
  PRConditionConfig,
  ProjectConditionConfig
} from '../../../types'
import { Issues, Project, PullRequests } from '../../contexts'
import { evaluator } from '../../evaluator'

const TYPE = '$only'

export interface ConditionOnlyOne {
  required: number
  type: typeof TYPE
  pattern: [PRConditionConfig | IssueConditionConfig | ProjectConditionConfig]
}

function only(
  this: Issues | PullRequests | Project,
  condition: ConditionOnlyOne,
  props: IssueProps | PRProps | ProjectProps
) {
  let success: number = 0

  condition.pattern.forEach(condition => {
    if (evaluator.call(this, condition, props)) success++
  })

  return success == condition.required
}

export default [TYPE, only] as const

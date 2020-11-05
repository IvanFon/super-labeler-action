import { IssueProps, PRProps } from '.'
import { processRegExpPattern } from '../utils'

const TYPE = 'titleMatches'

export interface ConditionTitleMatches {
  type: typeof TYPE
  pattern: string
}

const titleMatches = (
  condition: ConditionTitleMatches,
  issue: IssueProps | PRProps,
) => {
  const pattern = processRegExpPattern(condition.pattern)
  return pattern.test(issue.title)
}

export default [TYPE, titleMatches] as const

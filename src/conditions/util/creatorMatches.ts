import { IssueProps, PRProps } from '../'
import { utils } from '../../utils'

const TYPE = 'creatorMatches'

export interface ConditionCreatorMatches {
  type: typeof TYPE
  pattern: string
}

export const creatorMatches = (
  condition: ConditionCreatorMatches,
  issue: IssueProps | PRProps
) => {
  const pattern = utils.processRegExpPattern(condition.pattern)
  return pattern.test(issue.creator)
}

export default [TYPE, creatorMatches] as const

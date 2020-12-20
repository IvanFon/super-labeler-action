import { IssueProps, ProjectProps, PRProps } from '../'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'titleMatches'

export interface ConditionTitleMatches {
  type: typeof TYPE
  pattern: string
}

function titleMatches(
  this: Issues | PullRequests | Project,
  condition: ConditionTitleMatches,
  issue: IssueProps | PRProps | ProjectProps
) {
  const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
  return pattern.test(issue.title)
}

export default [TYPE, titleMatches] as const

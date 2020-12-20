import { IssueProps, ProjectProps, PRProps } from '../'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'creatorMatches'

export interface ConditionCreatorMatches {
  type: typeof TYPE
  pattern: string
}

function creatorMatches(
  this: Issues | PullRequests | Project,
  condition: ConditionCreatorMatches,
  issue: IssueProps | PRProps | ProjectProps
) {
  const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
  return pattern.test(issue.creator)
}

export default [TYPE, creatorMatches] as const

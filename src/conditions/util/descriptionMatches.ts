import { IssueProps, ProjectProps, PRProps } from '../'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'descriptionMatches'

export interface ConditionDescriptionMatches {
  type: typeof TYPE
  pattern: string
}

function descriptionMatches(
  this: Issues | PullRequests | Project,
  condition: ConditionDescriptionMatches,
  issue: IssueProps | PRProps | ProjectProps
) {
  const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
  return pattern.test(issue.description)
}

export default [TYPE, descriptionMatches] as const

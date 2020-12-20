import { PRProps } from '.'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'branchMatches'

export interface ConditionBranchMatches {
  type: typeof TYPE
  pattern: string
}

function branchMatches(
  this: Issues | PullRequests | Project,
  condition: ConditionBranchMatches,
  pr: PRProps
) {
  const pattern = this.util.parsingData.processRegExpPattern(condition.pattern)
  return pattern.test(pr.branch)
}

export default [TYPE, branchMatches] as const

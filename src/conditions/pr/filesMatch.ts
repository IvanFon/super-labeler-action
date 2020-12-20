import { match } from 'minimatch'
import { PRProps } from '.'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'filesMatch'

export interface ConditionFilesMatch {
  type: typeof TYPE
  glob: string
}

function filesMatch(
  this: Issues | PullRequests | Project,
  condition: ConditionFilesMatch,
  pr: PRProps
) {
  return match(pr.files, condition.glob).length > 0
}

export default [TYPE, filesMatch] as const

import { IssueProps, ProjectProps, PRProps } from '../'
import { Issues, Project, PullRequests } from '../../contexts'

const TYPE = 'isOpen'

enum States {
  Open = 'OPEN',
  Closed = 'CLOSED'
}

export interface ConditionIsOpen {
  type: typeof TYPE
  value: boolean
}

function isOpen(
  this: Issues | PullRequests | Project,
  condition: ConditionIsOpen,
  issue: IssueProps | PRProps | ProjectProps
) {
  return (
    this.util.parsingData.normalize(issue.state) ===
    this.util.parsingData.normalize(
      condition.value ? States.Open : States.Closed
    )
  )
}

export default [TYPE, isOpen] as const

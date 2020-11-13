import { IssueProps, PRProps } from '../'
import { utils } from '../../utils'

const TYPE = 'isOpen'

enum States {
  Open = 'OPEN',
  Closed = 'CLOSED'
}

export interface ConditionIsOpen {
  type: typeof TYPE
  value: boolean
}

const isOpen = (condition: ConditionIsOpen, issue: IssueProps | PRProps) => {
  return (
    utils.normalize(issue.state) ===
    utils.normalize(condition.value ? States.Open : States.Closed)
  )
}

export default [TYPE, isOpen] as const

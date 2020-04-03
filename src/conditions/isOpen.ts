import { IssueProps, PRProps } from '.';
import { normalize } from '../utils';

const TYPE = 'isOpen';

enum States {
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export interface ConditionIsOpen {
  type: typeof TYPE;
  value: boolean;
}

const isOpen = (condition: ConditionIsOpen, issue: IssueProps | PRProps) => {
  return (
    normalize(issue.state) ===
    normalize(condition.value ? States.Open : States.Closed)
  );
};

export default [TYPE, isOpen] as const;

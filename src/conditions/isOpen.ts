import { IssueProps, PRProps } from '.';

const TYPE = 'isOpen';

const STATES = {
  open: "OPEN",
  closed: "CLOSED"
}

export interface ConditionIsOpen {
  type: typeof TYPE;
  value: boolean;
}

const normalize = (text: string ) => (text || '').toUpperCase();

const isOpen = (condition: ConditionIsOpen, issue: IssueProps | PRProps) => {
  return normalize(issue.state) === normalize(condition.value ?  STATES.open : STATES.closed);
};

export default [TYPE, isOpen] as const;

import { IssueProps, PRProps } from '.';

const TYPE = 'isOpen';

export interface ConditionIsOpen {
  type: typeof TYPE;
}

const isOpen = (_condition: ConditionIsOpen, issue: IssueProps | PRProps) =>
  issue.state === 'open';

export default [TYPE, isOpen] as const;

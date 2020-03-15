import { IssueProps, PRProps } from '.';

const TYPE = 'isOpen';

export interface ConditionIsOpen {
  type: typeof TYPE;
  value: boolean;
}

const isOpen = (condition: ConditionIsOpen, issue: IssueProps | PRProps) => {
  return condition.value ? issue.state === 'open' : issue.state === 'closed';
};

export default [TYPE, isOpen] as const;

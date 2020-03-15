import { IssueProps, PRProps } from '.';

const TYPE = 'isClosed';

export interface ConditionIsClosed {
  type: typeof TYPE;
}

const isClosed = (_condition: ConditionIsClosed, issue: IssueProps | PRProps) =>
  issue.state === 'closed';

export default [TYPE, isClosed] as const;

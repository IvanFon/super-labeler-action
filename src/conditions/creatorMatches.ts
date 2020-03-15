import { IssueProps, PRProps } from '.';

const TYPE = 'creatorMatches';

export interface ConditionCreatorMatches {
  type: typeof TYPE;
  pattern: string;
}

const creatorMatches = (
  condition: ConditionCreatorMatches,
  issue: IssueProps | PRProps,
) => {
  const pattern = new RegExp(condition.pattern);
  return pattern.test(issue.creator);
};

export default [TYPE, creatorMatches] as const;

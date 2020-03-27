import { IssueProps, PRProps } from '.';
import { processRegExpPattern } from '../utils';

const TYPE = 'creatorMatches';

export interface ConditionCreatorMatches {
  type: typeof TYPE;
  pattern: string;
}

const creatorMatches = (
  condition: ConditionCreatorMatches,
  issue: IssueProps | PRProps,
) => {
  const pattern = new RegExp(processRegExpPattern(condition.pattern));
  return pattern.test(issue.creator);
};

export default [TYPE, creatorMatches] as const;

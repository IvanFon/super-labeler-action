import { PRProps } from '.';
import { processRegExpPattern } from '../../utils';

const TYPE = 'branchMatches';

export interface ConditionBranchMatches {
  type: typeof TYPE;
  pattern: string;
}

const branchMatches = (condition: ConditionBranchMatches, pr: PRProps) => {
  const pattern = new RegExp(processRegExpPattern(condition.pattern));
  return pattern.test(pr.branch);
};

export default [TYPE, branchMatches] as const;

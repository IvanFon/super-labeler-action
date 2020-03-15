import { PRProps } from '.';

const TYPE = 'titleMatches';

export interface ConditionTitleMatches {
  type: typeof TYPE;
  pattern: string;
}

const titleMatches = (condition: ConditionTitleMatches, pr: PRProps) => {
  const pattern = new RegExp(condition.pattern);
  return pattern.test(pr.title);
};

export default [TYPE, titleMatches] as const;

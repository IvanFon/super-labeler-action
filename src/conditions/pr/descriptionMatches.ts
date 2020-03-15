import { PRProps } from '.';

const TYPE = 'descriptionMatches';

export interface ConditionDescriptionMatches {
  type: typeof TYPE;
  pattern: string;
}

const descriptionMatches = (
  condition: ConditionDescriptionMatches,
  pr: PRProps,
) => {
  const pattern = new RegExp(condition.pattern);
  return pattern.test(pr.description);
};

export default [TYPE, descriptionMatches] as const;

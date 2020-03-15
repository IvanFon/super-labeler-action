import { IssueProps, PRProps } from '.';

const TYPE = 'descriptionMatches';

export interface ConditionDescriptionMatches {
  type: typeof TYPE;
  pattern: string;
}

const descriptionMatches = (
  condition: ConditionDescriptionMatches,
  issue: IssueProps | PRProps,
) => {
  const pattern = new RegExp(condition.pattern);
  return pattern.test(issue.description);
};

export default [TYPE, descriptionMatches] as const;

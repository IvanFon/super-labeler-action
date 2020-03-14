import { PRProps } from '.';

const TYPE = 'isDraft';

export interface ConditionIsDraft {
  type: typeof TYPE;
  value: boolean;
}

const isDraft = (condition: ConditionIsDraft, pr: PRProps) => {
  return pr.isDraft === condition.value;
};

export default [TYPE, isDraft] as const;

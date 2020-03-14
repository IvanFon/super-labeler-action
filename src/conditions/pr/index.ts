import isDraft, { ConditionIsDraft } from './isDraft';

export type Condition = ConditionIsDraft;

export interface PRProps {
  isDraft: boolean;
}

const handlers = [isDraft];

export const getConditionHandler = (condition: Condition) => {
  const handler = handlers.find((handler) => handler[0] === condition.type);
  return handler?.[1];
};

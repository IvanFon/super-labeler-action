import { Condition, handlers as sharedHandlers } from '../'

export type IssueCondition = Condition

const handlers = [...sharedHandlers]

export const getIssueConditionHandler = (condition: IssueCondition) => {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler?.[1]
}

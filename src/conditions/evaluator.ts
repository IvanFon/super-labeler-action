import * as core from '@actions/core';

import { IssueConditionConfig, PRConditionConfig } from '../index';
import {
  IssueCondition,
  PRCondition,
  getIssueConditionHandler,
  getPRConditionHandler,
} from './index';

import { PRProps, IssueProps } from '../parseContext';

export enum ConditionSetType {
  issue = 'issue',
  pr = 'pr',
}

const forConditions = <T extends IssueCondition | PRCondition>(
  conditions: T[],
  callback: (condition: T) => boolean,
) => {
  let matches = 0;
  for (const condition of conditions) {
    core.debug(`Condition: ${JSON.stringify(condition)}`);
    if (callback(condition)) {
      matches++;
    }
  }
  core.debug(`Matches: ${matches}`);
  return matches;
};

export default function evaluator(
  conditionSetType: ConditionSetType,
  config: PRConditionConfig | IssueConditionConfig,
  props: PRProps | IssueProps,
) {
  const { conditions, requires } = config;

  const matches = forConditions(conditions, (condition) => {
    const handler =
      conditionSetType === ConditionSetType.issue
        ? getIssueConditionHandler(condition as IssueCondition)
        : getPRConditionHandler(condition as PRCondition);
    return handler?.(condition as any, props as any) || false;
  });
  return matches >= requires;
}

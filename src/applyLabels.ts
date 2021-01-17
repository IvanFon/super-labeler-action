import * as core from '@actions/core';
import { GitHub } from '@actions/github';

import { Config } from './types';
import { addLabel, removeLabel, Repo } from './api';
import {
  getIssueConditionHandler,
  getPRConditionHandler,
  IssueCondition,
  PRCondition,
} from './conditions';
import { IssueContext, PRContext, Labels } from './parseContext';

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

const addRemoveLabel = async ({
  client,
  curLabels,
  label,
  labelIdToName,
  matches,
  num,
  repo,
  requires,
  dryRun,
}: {
  client: GitHub;
  curLabels: Labels;
  label: string;
  labelIdToName: { [key: string]: string };
  matches: number;
  num: number;
  repo: Repo;
  requires: number;
  dryRun: boolean;
}) => {
  const labelName = labelIdToName[label];
  const hasLabel = curLabels.filter((l) => l.name === labelName).length > 0;
  if (matches >= requires && !hasLabel) {
    core.debug(`${matches} >= ${requires} matches, adding label "${label}"...`);
    await addLabel({ client, repo, num, label: labelName, dryRun });
  }
  if (matches < requires && hasLabel) {
    core.debug(
      `${matches} < ${requires} matches, removing label "${label}"...`,
    );
    await removeLabel({ client, repo, num, label: labelName, dryRun });
  }
};

export const applyIssueLabels = async ({
  client,
  config,
  issueContext,
  labelIdToName,
  repo,
  dryRun,
}: {
  client: GitHub;
  config: Config['issue'];
  issueContext: IssueContext;
  labelIdToName: { [key: string]: string };
  repo: Repo;
  dryRun: boolean;
}) => {
  const { labels: curLabels, issueProps, num } = issueContext;
  for (const [label, opts] of Object.entries(config)) {
    core.debug(`Label: ${label}`);

    const matches = forConditions<IssueCondition>(
      opts.conditions,
      (condition) => {
        const handler = getIssueConditionHandler(condition);
        return handler?.(condition as any, issueProps) || false;
      },
    );

    await addRemoveLabel({
      client,
      curLabels,
      label,
      labelIdToName,
      matches,
      num,
      repo,
      requires: opts.requires,
      dryRun,
    });
  }
};

export const applyPRLabels = async ({
  client,
  config,
  labelIdToName,
  prContext,
  repo,
  dryRun,
}: {
  client: GitHub;
  config: Config['pr'];
  labelIdToName: { [key: string]: string };
  prContext: PRContext;
  repo: Repo;
  dryRun: boolean;
}) => {
  const { labels: curLabels, prProps, num } = prContext;
  for (const [label, opts] of Object.entries(config)) {
    core.debug(`Label: ${label}`);

    console.log(opts.conditions)
    const matches = forConditions<PRCondition>(opts.conditions, (condition) => {
      const handler = getPRConditionHandler(condition);
      return handler?.(condition as any, prProps) || false;
    });

    await addRemoveLabel({
      client,
      curLabels,
      label,
      labelIdToName,
      matches,
      num,
      repo,
      requires: opts.requires,
      dryRun,
    });
  }
};

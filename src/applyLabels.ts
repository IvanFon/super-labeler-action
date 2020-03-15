import * as core from '@actions/core';
import { GitHub } from '@actions/github';

import { Config } from '.';
import { addLabel, removeLabel, Repo } from './api';
import { getConditionHandler as getPRConditionHandler } from './conditions/pr';
import { PRContext } from './parseContext';

export const applyPRLabels = async ({
  client,
  config,
  prContext,
  repo,
}: {
  client: GitHub;
  config: Config['pr'];
  prContext: PRContext;
  repo: Repo;
}) => {
  const { labels: curLabels, prProps, prNum } = prContext;
  for (const [label, opts] of Object.entries(config)) {
    core.debug(`Label: ${label}`);

    let matches = 0;

    for (const condition of opts.conditions) {
      core.debug(`Condition: ${JSON.stringify(condition)}`);

      const handler = getPRConditionHandler(condition);
      if (handler?.(condition as any, prProps)) {
        matches++;
      }
      core.debug(`Matches: ${matches}`);
    }

    const hasLabel = curLabels.filter((l) => l.name === label).length > 0;

    if (matches >= opts.requires && !hasLabel) {
      core.debug(
        `${matches} >= ${opts.requires} matches, adding label "${label}"...`,
      );
      await addLabel({ client, repo, prNum, label });
    } else if (hasLabel) {
      core.debug(
        `${matches} < ${opts.requires} matches, removing label "${label}"...`,
      );
      await removeLabel({ client, repo, prNum, label });
    }
  }
};

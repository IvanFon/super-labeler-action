import fs from 'fs';
import path from 'path';

import * as core from '@actions/core';
import * as github from '@actions/github';

import { addLabel, removeLabel } from './api';
import {
  Condition as PRCondition,
  getConditionHandler as getPRConditionHandler,
} from './conditions/pr';
import { parsePRContext } from './parseContext';

interface Config {
  pr: {
    [key: string]: {
      requires: number;
      conditions: PRCondition[];
    };
  };
}

const context = github.context;

(async () => {
  try {
    // Get inputs
    const token = core.getInput('github-token', { required: true });
    const configPath = path.join(__dirname, '../', core.getInput('config'));
    const repo = context.repo;

    const prContext = parsePRContext(context);
    if (!prContext) {
      throw new Error('pull request not found on context');
    }
    const { labels: curLabels, prProps, prNum } = prContext;
    core.info(`Running on PR #${prNum}`);

    // Load config
    if (!fs.existsSync(configPath)) {
      throw new Error(`config not found at "${configPath}"`);
    }
    const config: Config = JSON.parse(fs.readFileSync(configPath).toString());
    core.debug(`Config: ${JSON.stringify(config)}`);

    const client = new github.GitHub(token);

    const labels = Object.entries(config.pr);
    for (const [label, opts] of labels) {
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

      if (matches >= opts.requires) {
        core.debug(
          `${matches} >= ${opts.requires} matches, adding label "${label}"...`,
        );
        await addLabel({ client, repo, prNum, label });
      } else if (curLabels.filter((l) => l.name === label).length > 0) {
        core.debug(
          `${matches} < ${opts.requires} matches, removing label "${label}"...`,
        );
        await removeLabel({ client, repo, prNum, label });
      }
    }
  } catch (err) {
    core.error(err.message);
    core.setFailed(err.message);
  }
})();

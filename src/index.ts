import fs from 'fs';
import path from 'path';

import * as core from '@actions/core';
import * as github from '@actions/github';

import {
  Condition as PRCondition,
  getConditionHandler as getPRConditionHandler,
  PRProps,
} from './conditions/pr';
import { addLabel, removeLabel } from './api';

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
    if (!context.payload.pull_request) {
      throw new Error('pull request not found on context');
    }

    // Get inputs
    const token = core.getInput('github-token', { required: true });
    const configPath = path.join(__dirname, '../', core.getInput('config'));
    const repo = context.repo;
    const curLabels = (context.payload.pull_request.labels as {
      name: string;
    }[]).map((label) => label.name);
    const prProps: PRProps = {
      branch: context.payload.pull_request.head.ref,
      isDraft: context.payload.pull_request.draft,
    };
    const prNum = context.payload.pull_request.number;
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
      } else if (curLabels.includes(label)) {
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

import fs from 'fs';
import path from 'path';

import * as core from '@actions/core';
import * as github from '@actions/github';

import { applyPRLabels } from './applyLabels';
import { Condition as PRCondition } from './conditions/pr';
import { parsePRContext } from './parseContext';
import syncLabels from './syncLabels';

export interface Config {
  labels: {
    [key: string]: {
      name: string;
      colour: string;
      description: string;
    };
  };
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
    const configPath = path.join(
      process.env.GITHUB_WORKSPACE as string,
      core.getInput('config'),
    );
    const repo = context.repo;

    const prContext = parsePRContext(context);
    if (!prContext) {
      throw new Error('pull request not found on context');
    }
    core.debug(`PR context: ${JSON.stringify(prContext)}`);

    // Load config
    if (!fs.existsSync(configPath)) {
      throw new Error(`config not found at "${configPath}"`);
    }
    const config: Config = JSON.parse(fs.readFileSync(configPath).toString());
    core.debug(`Config: ${JSON.stringify(config)}`);

    const client = new github.GitHub(token);

    await syncLabels({ client, repo, config: config.labels });

    await applyPRLabels({ client, config: config.pr, prContext, repo });
  } catch (err) {
    core.error(err.message);
    core.setFailed(err.message);
  }
})();

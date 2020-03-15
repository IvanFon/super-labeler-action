import fs from 'fs';
import path from 'path';

import * as core from '@actions/core';
import * as github from '@actions/github';

import { applyIssueLabels, applyPRLabels } from './applyLabels';
import { IssueCondition, PRCondition } from './conditions';
import {
  IssueContext,
  parseIssueContext,
  parsePRContext,
  PRContext,
} from './parseContext';
import syncLabels from './syncLabels';

export interface Config {
  labels: {
    [key: string]: {
      name: string;
      colour: string;
      description: string;
    };
  };
  issue: {
    [key: string]: {
      requires: number;
      conditions: IssueCondition[];
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

    // Load config
    if (!fs.existsSync(configPath)) {
      throw new Error(`config not found at "${configPath}"`);
    }
    const config: Config = JSON.parse(fs.readFileSync(configPath).toString());
    core.debug(`Config: ${JSON.stringify(config)}`);

    let curContext:
      | { type: 'pr'; context: PRContext }
      | { type: 'issue'; context: IssueContext };
    if (context.payload.pull_request) {
      const ctx = parsePRContext(context);
      if (!ctx) {
        throw new Error('pull request not found on context');
      }
      core.debug(`PR context: ${JSON.stringify(ctx)}`);

      curContext = {
        type: 'pr',
        context: ctx,
      };
    } else if (context.payload.issue) {
      const ctx = parseIssueContext(context);
      if (!ctx) {
        throw new Error('issue not found on context');
      }
      core.debug(`issue context: ${JSON.stringify(ctx)}`);

      curContext = {
        type: 'issue',
        context: ctx,
      };
    } else {
      return;
    }

    const client = new github.GitHub(token);

    await syncLabels({ client, repo, config: config.labels });

    if (curContext.type === 'pr') {
      await applyPRLabels({
        client,
        config: config.pr,
        prContext: curContext.context,
        repo,
      });
    } else if (curContext.type === 'issue') {
      await applyIssueLabels({
        client,
        config: config.issue,
        issueContext: curContext.context,
        repo,
      });
    }
  } catch (err) {
    core.error(err.message);
    core.setFailed(err.message);
  }
})();

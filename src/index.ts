const github = require('@actions/github');
const core = require('@actions/core');
const path = require('path');

const superLabeler = require('./superLabeler');

const { GITHUB_WORKSPACE = '', SHOW_LOGS, GH_ACTION_LOCAL_TEST } = process.env;

const dryRun = !!GH_ACTION_LOCAL_TEST;
const showLogs = SHOW_LOGS === 'true';
const configFile = core.getInput('config');

const configPath = path.join(
  GITHUB_WORKSPACE,
  configFile,
);

const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN', {
  required: true,
});

const options = {
  configPath,
  showLogs,
  dryRun,
};

const action = new superLabeler(new github.GitHub(GITHUB_TOKEN), options);

action.run();

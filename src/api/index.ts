import * as github from '@actions/github';

export interface Repo {
  owner: string;
  repo: string;
}

export interface ApiProps {
  client: github.GitHub;
  repo: Repo;
}

export interface IssueApiProps extends ApiProps {
  num: number;
}

export * from './addLabel';
export * from './createLabel';
export * from './deleteLabel';
export * from './getLabels';
export * from './removeLabel';
export * from './updateLabel';

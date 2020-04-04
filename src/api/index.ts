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
  IDNumber: number;
}

export * from './addLabel';
export * from './createLabel';
export * from './deleteLabel';
export * from './getLabels';
export * from './listFiles';
export * from './removeLabel';
export * from './updateLabel';

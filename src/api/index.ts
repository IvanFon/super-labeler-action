import * as github from '@actions/github';

export interface Repo {
  owner: string;
  repo: string;
}

interface ApiProps {
  client: github.GitHub;
  repo: Repo;
}

export interface PRApiProps extends ApiProps {
  prNum: number;
}

export * from './addLabel';
export * from './removeLabel';

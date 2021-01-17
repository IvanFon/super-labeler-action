import { IssueCondition, PRCondition } from './conditions';

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

export interface Options {
  configPath: string;
  showLogs: boolean;
  dryRun: boolean;
}
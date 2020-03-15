import { Context } from '@actions/github/lib/context';

interface Props {
  description: string;
  state: 'open' | 'closed';
  title: string;
}

export interface PRProps extends Props {
  branch: string;
  isDraft: boolean;
}

export interface IssueProps extends Props {}

export interface Label {
  name: string;
  description: string;
  color: string;
}

export type Labels = Label[];

interface GeneralContext {
  labels: Labels;
  num: number;
}

export interface PRContext extends GeneralContext {
  prProps: PRProps;
}

export interface IssueContext extends GeneralContext {
  issueProps: IssueProps;
}

export const parsePRContext = (context: Context): PRContext | undefined => {
  const pr = context.payload.pull_request;
  if (!pr) {
    return;
  }

  const labels = parseLabels(pr.labels);

  return {
    labels,
    num: pr.number,
    prProps: {
      branch: pr.head.ref,
      description: pr.body || '',
      isDraft: pr.draft,
      state: pr.state,
      title: pr.title,
    },
  };
};

export const parseIssueContext = (
  context: Context,
): IssueContext | undefined => {
  const issue = context.payload.issue;
  if (!issue) {
    return;
  }

  const labels = parseLabels(issue.labels);

  return {
    labels,
    num: issue.number,
    issueProps: {
      description: issue.body || '',
      state: issue.state,
      title: issue.title,
    },
  };
};

const parseLabels = (labels: any): Labels => {
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels.filter(
    (label) =>
      typeof label === 'object' &&
      'name' in label &&
      'description' in label &&
      'color' in label,
  );
};

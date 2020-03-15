import { Context } from '@actions/github/lib/context';

export interface PRProps {
  branch: string;
  description: string;
  isDraft: boolean;
  title: string;
}

type Labels = {
  name: string;
  description: string;
  color: string;
}[];

interface PRContext {
  labels: Labels;
  prNum: number;
  prProps: PRProps;
}

export const parsePRContext = (context: Context): PRContext | undefined => {
  const pr = context.payload.pull_request;
  if (!pr) {
    return;
  }

  const labels = parseLabels(pr.labels);

  return {
    labels,
    prNum: pr.number,
    prProps: {
      branch: pr.head.ref,
      description: pr.body || '',
      isDraft: pr.draft,
      title: pr.title,
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

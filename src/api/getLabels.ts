import { ApiProps } from '.';
import { Labels } from '../parseContext';

export const getLabels = async ({
  client,
  repo,
}: ApiProps): Promise<Labels> => {
  const labels = await client.issues.listLabelsForRepo({ ...repo });
  return labels.data.map((label) => ({
    name: label.name,
    description: label.description,
    color: label.color,
  }));
};

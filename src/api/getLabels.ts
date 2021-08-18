import { ApiProps } from '.';
import { Labels } from '../parseContext';

export const getLabels = async ({
  client,
  repo,
}: ApiProps): Promise<Labels> => {
  // TODO: ラベルが100件以上ある場合にページングに対応させる必要がある
  const labels = await client.issues.listLabelsForRepo({ per_page: 100, ...repo });
  return labels.data.map((label) => ({
    name: label.name,
    description: label.description,
    color: label.color,
  }));
};

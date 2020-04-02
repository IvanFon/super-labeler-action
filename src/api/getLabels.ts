import { ApiProps } from '.';
import { Labels } from '../parseContext';

export const getLabels = async ({
  client,
  repo,
}: ApiProps): Promise<Labels> => {
  const options = await client.issues.listLabelsForRepo.endpoint.merge({ ...repo });
  
  const labels = await client.paginate(options)
  
  return labels.map((label) => ({
    name: label.name,
    description: label.description,
    color: label.color,
  }));
};

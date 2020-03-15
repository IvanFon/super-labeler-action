import { ApiProps } from '.';

export const deleteLabel = async ({
  client,
  repo,
  name,
}: ApiProps & { name: string }) => {
  await client.issues.deleteLabel({
    ...repo,
    name,
  });
};

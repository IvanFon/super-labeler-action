import { PRApiProps } from '.';

export const removeLabel = async ({
  client,
  repo,
  prNum,
  label,
}: PRApiProps & {
  label: string;
}) =>
  await client.issues.removeLabel({
    ...repo,
    issue_number: prNum,
    name: label,
  });

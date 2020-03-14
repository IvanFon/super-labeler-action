import { PRApiProps } from '.';

export const addLabel = async ({
  client,
  repo,
  prNum,
  label,
}: PRApiProps & {
  label: string;
}) =>
  await client.issues.addLabels({
    ...repo,
    issue_number: prNum,
    labels: [label],
  });

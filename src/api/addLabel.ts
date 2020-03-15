import { IssueApiProps } from '.';

export const addLabel = async ({
  client,
  repo,
  num,
  label,
}: IssueApiProps & {
  label: string;
}) =>
  await client.issues.addLabels({
    ...repo,
    issue_number: num,
    labels: [label],
  });

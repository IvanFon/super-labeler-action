import { IssueApiProps } from '.';

export const addLabel = async ({
  client,
  repo,
  IDNumber,
  label,
}: IssueApiProps & {
  label: string;
}) =>
  await client.issues.addLabels({
    ...repo,
    issue_number: IDNumber,
    labels: [label],
  });

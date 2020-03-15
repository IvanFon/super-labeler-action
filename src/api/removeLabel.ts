import { IssueApiProps } from '.';

export const removeLabel = async ({
  client,
  repo,
  num,
  label,
}: IssueApiProps & {
  label: string;
}) =>
  await client.issues.removeLabel({
    ...repo,
    issue_number: num,
    name: label,
  });

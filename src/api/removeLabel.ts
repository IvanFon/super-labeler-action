import { IssueApiProps } from '.';

export const removeLabel = async ({
  client,
  repo,
  IDNumber,
  label,
}: IssueApiProps & {
  label: string;
}) =>
  await client.issues.removeLabel({
    ...repo,
    issue_number: IDNumber,
    name: label,
  });

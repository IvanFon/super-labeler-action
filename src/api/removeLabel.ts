import { IssueApiProps } from '.';

export const removeLabel = async ({
  client,
  repo,
  num,
  label,
  dryRun,
}: IssueApiProps & {
  label: string;
  dryRun: boolean;
}) =>
  !dryRun && await client.issues.removeLabel({
    ...repo,
    issue_number: num,
    name: label,
  });

import { IssueApiProps } from '.'

export const removeLabel = async ({
  client,
  repo,
  IDNumber,
  label,
  dryRun,
}: IssueApiProps & {
  label: string
  dryRun: boolean
}) =>
  !dryRun &&
  (await client.issues.removeLabel({
    ...repo,
    issue_number: IDNumber,
    name: label,
  }))

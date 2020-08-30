import { IssueApiProps } from '.'

export const addLabel = async ({
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
  (await client.issues.addLabels({
    ...repo,
    issue_number: IDNumber,
    labels: [label],
  }))

import { ApiProps } from '.'

export const deleteLabel = async ({
  client,
  repo,
  name,
  dryRun,
}: ApiProps & { name: string; dryRun: boolean }) => {
  !dryRun &&
    (await client.issues.deleteLabel({
      ...repo,
      name,
    }))
}

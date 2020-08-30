import { IssueApiProps } from '.'

export const listFiles = async ({ client, IDNumber, repo }: IssueApiProps) => {
  const files = await client.pulls.listFiles({
    ...repo,
    pull_number: IDNumber,
    per_page: 100,
  })
  return files.data.map((file) => file.filename)
}

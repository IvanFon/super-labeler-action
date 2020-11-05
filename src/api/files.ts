import { IssueApiProps } from '.'

class File {
  async list({ client, IDNumber, repo }: IssueApiProps) {
    const files = await client.pulls.listFiles({
      ...repo,
      pull_number: IDNumber,
      per_page: 100
    })
    return files.data.map(file => file.filename)
  }
}

export const file = new File()

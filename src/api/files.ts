import { IssueApiProps } from '.'

class Files {
  async list ({ client, IDNumber, repo }: IssueApiProps) {
    const files = await client.pulls.listFiles({
      ...repo,
      pull_number: IDNumber,
      per_page: 100,
    })
    return files.data.map((file) => file.filename)
  }
}

export const files = new Files()

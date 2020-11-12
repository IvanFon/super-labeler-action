import { IssueApiProps } from '.'

class PullRequests {
  async list({ client, IDNumber, repo }: IssueApiProps) {
    const files = await client.pulls.listFiles({
      ...repo,
      pull_number: IDNumber,
      per_page: 100
    })
    return files.data.map(file => file.filename)
  }

  async changes(Additions: number, deletions: number) {
    return Additions + deletions
  }

  async pendingReview(
    { client, IDNumber, repo }: IssueApiProps,
    requested_reviews: number
  ): Promise<boolean> {
    const reviews = await client.pulls.listReviews({
      ...repo,
      pull_number: IDNumber,
      per_page: 100
    })
    return reviews.data.length <= requested_reviews
  }
}

export const pullRequests = new PullRequests()

import { GitHub } from '@actions/github'
import { Context } from '@actions/github/lib/context'
import { PRContext, IssueContext, Labels, Reviews } from './types'
import { pullRequests, Repo } from './api'
import { log } from '.'

class ContextHandler {
  /**
   * Parse the PR Context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parsePR(
    context: Context,
    client: GitHub,
    repo: Repo
  ): Promise<PRContext | undefined> {
    const pr = context.payload.pull_request
    if (!pr) {
      return
    }

    log(
      `context.payload.pull_request: ` +
        JSON.stringify(context.payload.pull_request),
      1
    )

    const IDNumber = pr.number
    const labels: Labels = await this.parseLabels(pr.labels).catch(err => {
      log(`Error thrown while parsing labels: ` + err, 5)
      throw err
    })
    const files: string[] = await pullRequests
      .list({ client, repo, IDNumber })
      .catch(err => {
        log(`Error thrown while listing files: ` + err, 5)
        throw err
      })

    const changes: number = await pullRequests
      .changes(pr.additions, pr.deletions)
      .catch(err => {
        log(`Error thrown while handling changes: ` + err, 5)
        throw err
      })

    const reviews: Reviews = await pullRequests
      .listReviews({ client, repo, IDNumber })
      .catch(err => {
        log(`Error thrown while handling reviews: ` + err, 5)
        throw err
      })

    const pendingReview: boolean = await pullRequests
      .pendingReview(reviews.length, pr.requested_reviewers.length)
      .catch(err => {
        log(`Error thrown while handling reviews: ` + err, 5)
        throw err
      })

    const requestedChanges: number = await pullRequests
      .requestedChanges(reviews)
      .catch(err => {
        log(`Error thrown while handling reviews: ` + err, 5)
        throw err
      })

    const approved: number = await pullRequests
      .isApproved(reviews)
      .catch(err => {
        log(`Error thrown while handling reviews: ` + err, 5)
        throw err
      })

    return {
      labels,
      IDNumber,
      prProps: {
        branch: pr.head.ref,
        creator: pr.user.login,
        description: pr.body || '',
        isDraft: pr.draft,
        locked: pr.locked,
        state: pr.state,
        title: pr.title,
        files,
        changes,
        reviews,
        pendingReview,
        requestedChanges,
        approved
      }
    }
  }

  /**
   * Parse the Issue Context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parseIssue(context: Context): Promise<IssueContext | undefined> {
    const issue = context.payload.issue
    if (!issue) {
      return
    }

    log(`context.payload.issue: ` + JSON.stringify(context.payload.issue), 1)

    const labels: Labels = await this.parseLabels(issue.labels).catch(err => {
      log(`Error thrown while parsing labels: ` + err, 5)
      throw err
    })

    return {
      labels,
      IDNumber: issue.number,
      issueProps: {
        creator: issue.user.login,
        description: issue.body || '',
        locked: issue.locked,
        state: issue.state,
        title: issue.title
      }
    }
  }

  /**
   * Parse the labels
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parseLabels(labels: any): Promise<Labels> {
    if (!Array.isArray(labels)) {
      return []
    }

    return labels.filter(
      label =>
        typeof label === 'object' &&
        'name' in label &&
        'description' in label &&
        'color' in label
    )
  }
}
export const contextHandler = new ContextHandler()

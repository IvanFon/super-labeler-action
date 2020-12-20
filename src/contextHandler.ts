import { Context } from '@actions/github/lib/context'
import { loggingData } from '@videndum/utilities'
import { log } from '.'
import { Config, Label, Labels } from '../types'
import {
  IssueContext,
  PRContext,
  ProjectContext,
  Reviews,
  Version
} from './conditions'
import { Utils } from './utils'

class ContextHandler {
  /**
   * Parse the PR Context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parsePR(
    utils: Utils,
    config: Config,
    context: Context
  ): Promise<PRContext | undefined> {
    const pr = context.payload.pull_request
    if (!pr || !config.pr) {
      return
    }

    log(
      new loggingData(
        '100',
        `context.payload.pull_request: ` +
          JSON.stringify(context.payload.pull_request)
      )
    )

    const IDNumber = pr.number
    const labels = await this.parseLabels(pr.labels).catch(err => {
      log(new loggingData('500', `Error thrown while parsing labels: `, err))
      throw err
    })
    const files: string[] = await utils.api.files.list(IDNumber).catch(err => {
      log(new loggingData('500', `Error thrown while listing files: `, err))
      throw err
    })

    const changes: number = await utils.api.pullRequests
      .changes(pr.additions, pr.deletions)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while handling changes: `, err)
        )
        throw err
      })

    const reviews: Reviews = await utils.api.pullRequests.reviews
      .list(IDNumber)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while handling reviews: `, err)
        )
        throw err
      })

    const pendingReview: boolean = await utils.api.pullRequests.reviews
      .pending(reviews.length, pr.requested_reviewers.length)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while handling reviews: `, err)
        )
        throw err
      })

    const requestedChanges: number = await utils.api.pullRequests.reviews
      .requestedChanges(reviews)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while handling reviews: `, err)
        )
        throw err
      })

    const approved: number = await utils.api.pullRequests.reviews
      .isApproved(reviews)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while handling reviews: `, err)
        )
        throw err
      })

    const currentVersion: Version = await utils.versioning
      .parse(config, config.pr.ref)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while parsing versioning: `, err)
        )
        throw err
      })

    return {
      ref: pr.base.ref,
      sha: context.sha,
      action: context.payload.action as string,
      currentVersion,
      IDNumber: context.payload.pull_request?.id,
      props: {
        type: 'pr',
        ID: IDNumber,
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
        labels,
        pendingReview,
        requestedChanges,
        approved
      }
    }
  }

  /**
   * Parse the Project Context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parseProject(
    utils: Utils,
    config: Config,
    context: Context
  ): Promise<ProjectContext | undefined> {
    const project = context.payload.project_card
    if (!project || !config.project) {
      return
    }
    log(
      new loggingData(
        '100',
        `context.payload.project_card: ${JSON.stringify(
          context.payload.project_card
        )}`
      )
    )

    if (!project.content_url) throw new Error('No content information to get')
    const issueNumber: number = project.content_url.split('/').pop()
    const issue = await await utils.api.issues.get(issueNumber)

    const labels = await this.parseLabels(issue.labels).catch(err => {
      log(new loggingData('500', `Error thrown while parsing labels: `, err))
      throw err
    })

    const currentVersion: Version = await utils.versioning
      .parse(config, config.project.ref)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while parsing versioning: `, err)
        )
        throw err
      })

    let localProject
    localProject = await utils.api.project.projects.get(
      project.project_url.split('/').pop()
    )
    const changes = context.payload.changes
    const localColumn = await utils.api.project.column.get(project.column_id)

    const localCard = await utils.api.project.card.get(project.id)

    return {
      sha: context.sha,
      action: context.payload.action as string,
      currentVersion,
      IDNumber: issue.id,
      props: {
        type: 'project',
        ID: issue.number,
        creator: issue.user.login,
        description: issue.body || '',
        locked: issue.locked,
        state: issue.state as ProjectContext['props']['state'],
        title: issue.title,
        project: localProject,
        column_id: project.column_id,
        localColumn,
        localCard,
        changes,
        labels
      }
    }
  }
  /**
   * Parse the Issue Context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parseIssue(
    utils: Utils,
    config: Config,
    context: Context
  ): Promise<IssueContext | undefined> {
    const issue = context.payload.issue
    if (!issue || !config.issue) {
      return
    }

    log(
      new loggingData(
        '100',
        `context.payload.issue: ` + JSON.stringify(context.payload.issue)
      )
    )

    const labels = await this.parseLabels(issue.labels).catch(err => {
      log(new loggingData('500', `Error thrown while parsing labels: `, err))
      throw err
    })

    const currentVersion: Version = await utils.versioning
      .parse(config, config.issue.ref)
      .catch(err => {
        log(
          new loggingData('500', `Error thrown while parsing versioning: `, err)
        )
        throw err
      })

    return {
      sha: context.sha,
      action: context.payload.action as string,
      currentVersion,
      IDNumber: context.payload.issue?.id,
      props: {
        type: 'issue',
        ID: issue.number,
        creator: issue.user.login,
        description: issue.body || '',
        locked: issue.locked,
        state: issue.state,
        labels,
        title: issue.title
      }
    }
  }

  /**
   * Parse the labels
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async parseLabels(labels: any): Promise<Labels | undefined> {
    if (!Array.isArray(labels)) {
      return
    }
    return labels.reduce((acc: { [key: string]: Label }, cur) => {
      acc[cur.name.toLowerCase()] = cur
      return acc
    }, {})
  }
}

export const contextHandler = new ContextHandler()

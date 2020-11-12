import { GitHub } from '@actions/github'
import { Context } from '@actions/github/lib/context'
import evaluator, { ConditionSetType } from './conditions/evaluator'
import { Config, PRContext, IssueContext, Labels } from './types'
import { labelAPI, pullRequests, Repo } from './api'
import { log } from '.'

class Utils {
  /**
   * Formats the hex color code to ensure no hash (#) is included
   * @author IvanFon, TGTGamer
   * @param {String} color Hex color code
   * @since 1.0.0
   */
  formatColor = (color: string) => {
    if (color.charAt(0) === '#') {
      return color.substr(1)
    } else {
      return color
    }
  }

  /**
   * Formats the hex color code to ensure no hash (#) is included
   * @author IvanFon, jbinda
   * @param {String} pattern Regex partern to use
   * @since 1.0.0
   */
  processRegExpPattern = (pattern: string) => {
    const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/)

    const [, source, flags] = matchDelimiters || []

    return new RegExp(source || pattern, flags)
  }

  /**
   * Normalizes text toUpperCase
   * @author IvanFon, TGTGamer
   * @since 1.0.0
   */
  normalize = (text: string) => (text || '').toUpperCase()
}

class ContextHandler {
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
    const pendingReview: boolean = await pullRequests
      .pendingReview({ client, repo, IDNumber }, pr.requested_reviewers.length)
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
        files,
        changes,
        pendingReview,
        isDraft: pr.draft,
        locked: pr.locked,
        state: pr.state,
        title: pr.title
      }
    }
  }

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

class LabelHandler {
  async addRemoveLabel({
    client,
    curLabels,
    labelID,
    labelName,
    IDNumber,
    repo,
    shouldHaveLabel,
    dryRun
  }: {
    client: GitHub
    curLabels: Labels
    labelID: string
    labelName: string
    IDNumber: number
    repo: Repo
    shouldHaveLabel: boolean
    dryRun: boolean
  }) {
    const hasLabel =
      (await curLabels.filter(l => l.name === labelName).length) > 0
    if (shouldHaveLabel && !hasLabel) {
      log(`Adding label "${labelID}"...`, 1)
      await labelAPI
        .add({ client, repo, IDNumber, label: labelName, dryRun })
        .catch(err => {
          log(`Error thrown while adding labels: ` + err, 5)
        })
    } else if (!shouldHaveLabel && hasLabel) {
      log(`Removing label "${labelID}"...`, 1)
      await labelAPI
        .remove({
          client,
          repo,
          IDNumber,
          label: labelName,
          dryRun
        })
        .catch(err => {
          log(`Error thrown while removing labels: ` + err, 5)
        })
    } else {
      log(
        `No action required for label "${labelID}" ${
          hasLabel ? 'as label is already applied.' : '.'
        }`,
        1
      )
    }
  }

  async applyIssue({
    client,
    config,
    issueContext,
    labelIdToName,
    repo,
    dryRun
  }: {
    client: GitHub
    config: Config['issue']
    issueContext: IssueContext
    labelIdToName: { [key: string]: string }
    repo: Repo
    dryRun: boolean
  }) {
    const { labels: curLabels, issueProps, IDNumber } = issueContext
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
      log(`Label: ${labelID}`, 1)

      const shouldHaveLabel = evaluator(
        ConditionSetType.issue,
        conditionsConfig,
        issueProps
      )

      await this.addRemoveLabel({
        client,
        curLabels,
        labelID,
        labelName: labelIdToName[labelID],
        IDNumber,
        repo,
        shouldHaveLabel,
        dryRun
      }).catch(err => {
        log(`Error thrown while running addRemoveLabel: ` + err, 5)
      })
    }
  }

  async applyPR({
    client,
    config,
    labelIdToName,
    prContext,
    repo,
    dryRun
  }: {
    client: GitHub
    config: Config['pr']
    labelIdToName: { [key: string]: string }
    prContext: PRContext
    repo: Repo
    dryRun: boolean
  }) {
    const { labels: curLabels, prProps, IDNumber } = prContext
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
      log(`Label: ${labelID}`, 1)

      const shouldHaveLabel = evaluator(
        ConditionSetType.pr,
        conditionsConfig,
        prProps
      )

      await this.addRemoveLabel({
        client,
        curLabels,
        labelID,
        labelName: labelIdToName[labelID],
        IDNumber,
        repo,
        shouldHaveLabel,
        dryRun
      }).catch(err => {
        log(`Error thrown while running addRemoveLabel: ` + err, 5)
      })
    }
  }
  /**
   * Syncronise labels to repository
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async syncLabels({
    client,
    config,
    repo,
    dryRun
  }: {
    client: GitHub
    config: Config['labels']
    repo: Repo
    dryRun: boolean
  }) {
    /**
     * Syncronises the repo labels
     * !todo Add delete labels
     * @since 2.0.0
     */
    const curLabels: Labels = await labelAPI
      .get({ client, repo })
      .catch(err => {
        log(`Error thrown while getting labels: ` + err, 5)
        throw err
      })
    log(`curLabels: ${JSON.stringify(curLabels)}`, 1)
    for (const configLabel of Object.values(config)) {
      const curLabel = await curLabels.filter(
        l => l.name.toLowerCase() === configLabel.name.toLowerCase()
      )

      /**
       * Update label
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      if (curLabel.length > 0) {
        const label = curLabel[0]
        if (
          (label.description !== configLabel.description &&
            configLabel.description !== undefined) ||
          label.color !== utils.formatColor(configLabel.color)
        ) {
          log(
            `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
              label
            )})`,
            1
          )
          await labelAPI
            .update({ client, repo, label: configLabel, dryRun })
            .catch(err => {
              log(`Error thrown while updating label: ` + err, 5)
            })
        } else {
          log(`No action required to update label: ${label.name}`, 1)
        }

        /**
         * Create label
         * @author IvanFon, TGTGamer, jbinda
         * @since 1.0.0
         */
      } else {
        log(`Create ${JSON.stringify(configLabel)}`, 1)
        await labelAPI
          .create({ client, repo, label: configLabel, dryRun })
          .catch(err => {
            log(`Error thrown while creating label: ` + err, 5)
          })
      }
    }
  }
}

export const utils = new Utils()
export const contextHandler = new ContextHandler()
export const labelHandler = new LabelHandler()

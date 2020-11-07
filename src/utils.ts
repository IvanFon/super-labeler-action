import * as core from '@actions/core'
import { GitHub } from '@actions/github'
import { Context } from '@actions/github/lib/context'
import evaluator, { ConditionSetType } from './conditions/evaluator'
import { Config, PRContext, IssueContext, Labels } from './types'
import { labelAPI, file, Repo } from './api'

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
  parsePR = async (
    context: Context,
    client: GitHub,
    repo: Repo
  ): Promise<PRContext | undefined> => {
    const pr = context.payload.pull_request
    if (!pr) {
      return
    }

    const IDNumber = pr.number
    const labels = this.parseLabels(pr.labels)
    const files = await file.list({ client, repo, IDNumber })

    return {
      labels,
      IDNumber,
      prProps: {
        branch: pr.head.ref,
        creator: pr.user.login,
        description: pr.body || '',
        files,
        isDraft: pr.draft,
        locked: pr.locked,
        state: pr.state,
        title: pr.title
      }
    }
  }

  parseIssue = (context: Context): IssueContext | undefined => {
    const issue = context.payload.issue
    if (!issue) {
      return
    }

    const labels = this.parseLabels(issue.labels)

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

  parseLabels = (labels: any): Labels => {
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
  addRemoveLabel = async ({
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
  }) => {
    const hasLabel = curLabels.filter(l => l.name === labelName).length > 0
    if (shouldHaveLabel && !hasLabel) {
      core.debug(`Adding label "${labelID}"...`)
      await labelAPI.add({ client, repo, IDNumber, label: labelName, dryRun })
    }
    if (!shouldHaveLabel && hasLabel) {
      core.debug(`Removing label "${labelID}"...`)
      await labelAPI.remove({
        client,
        repo,
        IDNumber,
        label: labelName,
        dryRun
      })
    }
  }

  applyIssue = async ({
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
  }) => {
    const { labels: curLabels, issueProps, IDNumber } = issueContext
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
      core.debug(`Label: ${labelID}`)

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
      })
    }
  }

  applyPR = async ({
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
  }) => {
    const { labels: curLabels, prProps, IDNumber } = prContext
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
      core.debug(`Label: ${labelID}`)

      const shouldHaveLabel = evaluator(
        ConditionSetType.issue,
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
      })
    }
  }
  /**
   * Syncronise labels to repository
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  syncLabels = async ({
    client,
    config,
    repo,
    dryRun
  }: {
    client: GitHub
    config: Config['labels']
    repo: Repo
    dryRun: boolean
  }) => {
    /**
     * Syncronises the repo labels
     * !todo Add delete labels
     * @since 2.0.0
     */
    const curLabels = await labelAPI.get({ client, repo })
    core.debug(`curLabels: ${JSON.stringify(curLabels)}`)
    for (const _configLabel of Object.values(config)) {
      const configLabel = {
        ..._configLabel,
        color: _configLabel.color
      }
      const curLabel = curLabels.filter(l => l.name === configLabel.name)

      /**
       * Update label
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      if (curLabel.length > 0) {
        const label = curLabel[0]
        if (
          label.description !== configLabel.description ||
          label.color !== utils.formatColor(configLabel.color)
        ) {
          core.debug(
            `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
              label
            )})`
          )
          try {
            await labelAPI.update({ client, repo, label: configLabel, dryRun })
          } catch (e) {
            core.error(`Label update error: ${e.message}`)
          }
        }

        /**
         * Create label
         * @author IvanFon, TGTGamer, jbinda
         * @since 1.0.0
         */
      } else {
        core.debug(`Create ${JSON.stringify(configLabel)}`)
        try {
          await labelAPI.create({ client, repo, label: configLabel, dryRun })
        } catch (e) {
          core.debug(`Label Creation failed: ${e.message}`)
        }
      }
    }
  }
}

export const utils = new Utils()
export const contextHandler = new ContextHandler()
export const labelHandler = new LabelHandler()

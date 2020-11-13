import { GitHub } from '@actions/github'
import evaluator, { ConditionSetType } from './conditions/evaluator'
import { Config, PRContext, IssueContext, Labels } from './types'
import { labelAPI, Repo } from './api'
import { log } from '.'
import { utils } from './utils'

class LabelHandler {
  /**
   * Add or Remove Labels
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
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
      log(`Adding label "${labelID}"...`, 2)
      await labelAPI
        .add({ client, repo, IDNumber, label: labelName, dryRun })
        .catch(err => {
          log(`Error thrown while adding labels: ` + err, 5)
        })
    } else if (!shouldHaveLabel && hasLabel) {
      log(`Removing label "${labelID}"...`, 2)
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
        2
      )
    }
  }

  /**
   * Apply Labels to Issues
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
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

  /**
   * Apply Labels to Pull Requests
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
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
            2
          )
          await labelAPI
            .update({ client, repo, label: configLabel, dryRun })
            .catch(err => {
              log(`Error thrown while updating label: ` + err, 5)
            })
        } else {
          log(`No action required to update label: ${label.name}`, 2)
        }

        /**
         * Create label
         * @author IvanFon, TGTGamer, jbinda
         * @since 1.0.0
         */
      } else {
        log(`Create ${JSON.stringify(configLabel)}`, 2)
        await labelAPI
          .create({ client, repo, label: configLabel, dryRun })
          .catch(err => {
            log(`Error thrown while creating label: ` + err, 5)
          })
      }
    }
  }
}
export const labelHandler = new LabelHandler()

import * as core from '@actions/core'
import { GitHub } from '@actions/github'

import { Config } from './types'
import { labelAPI, Repo } from './api'
import evaluator, { ConditionSetType } from './conditions/evaluator'

import { IssueContext, PRContext, Labels } from './parseContext'

const addRemoveLabel = async ({
  client,
  curLabels,
  labelID,
  labelName,
  IDNumber,
  repo,
  shouldHaveLabel,
  dryRun,
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
  const hasLabel = curLabels.filter((l) => l.name === labelName).length > 0
  if (shouldHaveLabel && !hasLabel) {
    core.debug(`Adding label "${labelID}"...`)
    await labelAPI.add({ client, repo, IDNumber, label: labelName, dryRun })
  }
  if (!shouldHaveLabel && hasLabel) {
    core.debug(`Removing label "${labelID}"...`)
    await labelAPI.remove({ client, repo, IDNumber, label: labelName, dryRun })
  }
}

export const applyIssueLabels = async ({
  client,
  config,
  issueContext,
  labelIdToName,
  repo,
  dryRun,
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
      issueProps,
    )

    await addRemoveLabel({
      client,
      curLabels,
      labelID,
      labelName: labelIdToName[labelID],
      IDNumber,
      repo,
      shouldHaveLabel,
      dryRun,
    })
  }
}

export const applyPRLabels = async ({
  client,
  config,
  labelIdToName,
  prContext,
  repo,
  dryRun,
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
      prProps,
    )

    await addRemoveLabel({
      client,
      curLabels,
      labelID,
      labelName: labelIdToName[labelID],
      IDNumber,
      repo,
      shouldHaveLabel,
      dryRun,
    })
  }
}

/**
 * Runs the Action
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */

import * as core from '@actions/core'
import * as github from '@actions/github'
import { Options, Config, Runners } from '../types'
import path from 'path'
import labelMastermind from './action'
import { Logger, loggingData } from '@videndum/utilities'
const L = new Logger({
  console: { enabled: false },
  sentry: {
    enabled: true,
    config: {
      dsn:
        'https://e7dd11f1f35b46048a62a8de2b69fa83@o237244.ingest.sentry.io/5508005'
    }
  }
})
export function log(loggingData: loggingData) {
  L.log(loggingData)
  const type = Number(loggingData.name) / 100
  if (type == 1) core.debug(loggingData.message)
  else if (type < 4) core.info(loggingData.message)
  else if (type == 4) core.warning(loggingData.message)
  else if (type < 7) core.error(loggingData.message)
  else core.setFailed(loggingData.message)
}

let local: any = undefined
let dryRun: boolean
let showLogs: boolean = false

try {
  local = require('../config.json')
  dryRun = local.GH_ACTION_LOCAL_TEST || false
  showLogs = local.SHOW_LOGS || false
} catch {}

const { GITHUB_WORKSPACE = '' } = process.env

/**
 * Runs the action
 * @author TGTGamer
 * @since 1.0.0
 */
function run() {
  if (dryRun)
    log(
      new loggingData(
        '300',
        `Label Mastermind is running in local dryrun mode. No labels will be applyed`
      )
    )
  const configInput = JSON.parse(
    core.getInput('configJSON') === '' ? '{}' : core.getInput('configJSON')
  )
  const GITHUB_TOKEN =
    core.getInput('GITHUB_TOKEN') ||
    (local == undefined ? undefined : local.GITHUB_TOKEN)
  if (!GITHUB_TOKEN) {
    return core.setFailed('No Token provided')
  }
  const options = {
    configPath: path.join(GITHUB_WORKSPACE, core.getInput('config')),
    configJSON:
      configInput.labelMastermind ||
      (configInput?.pr || configInput?.issue || configInput?.project
        ? configInput
        : local == undefined
        ? undefined
        : require(local.configJSON).labelMastermind
        ? require(local.configJSON).labelMastermind
        : require(local.configJSON)),
    showLogs,
    dryRun
  }
  const action = new labelMastermind(new github.GitHub(GITHUB_TOKEN), options)
  action.run().catch(err => {
    log(
      new loggingData(
        '800',
        `Label Mastermind did not complete due to error:`,
        err
      )
    )
  })
}
run()

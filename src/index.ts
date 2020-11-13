/**
 * Runs the Action
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */

import * as core from '@actions/core'
import * as github from '@actions/github'
import { Options, Config } from './types'
import path from 'path'
import superLabeler from './superLabeler'
import { Log } from '@videndum/utilities'
let local: any = undefined
let dryRun: boolean
let showLogs: boolean = false
try {
  local = require('../config.json')
  dryRun = local.GH_ACTION_LOCAL_TEST || false
  showLogs = local.SHOW_LOGS || false
} catch {}

const { GITHUB_WORKSPACE = '' } = process.env

const L = new Log({ sentry: { enabled: !showLogs, config: { dsn: '' } } })
export function log(loggingData: string, type: number) {
  L.log({ raw: loggingData }, type)
  if (type == 1) core.debug(loggingData)
  else if (type < 4) core.info(loggingData)
  else if (type < 7) core.error(loggingData)
  else core.setFailed(loggingData)
}

function start() {
  if (dryRun)
    log(
      `Super Labeler is running in local dryrun mode. No labels will be applyed`,
      3
    )
  const configInput = JSON.parse(core.getInput('configJSON') || '{}')
  const configJSON: Config =
    configInput.SuperLabeler ||
    (configInput.labels
      ? configInput
      : local == undefined
      ? undefined
      : require(local.configJSON))
  const configFile = core.getInput('config')
  log(`Config file ${configFile}`, 1)
  const configPath = path.join(GITHUB_WORKSPACE, configFile)
  log(`Config Path ${configPath}`, 1)
  const GITHUB_TOKEN =
    core.getInput('GITHUB_TOKEN') ||
    (local == undefined ? undefined : local.GITHUB_TOKEN)
  if (!GITHUB_TOKEN) {
    return core.setFailed('No Token provided')
  }
  log('Github Token Collected ', 1)
  const options: Options = {
    configPath,
    showLogs,
    configJSON,
    dryRun
  }
  const action = new superLabeler(new github.GitHub(GITHUB_TOKEN), options)
  action.run()
}
start()

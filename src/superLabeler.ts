import fs from 'fs'

import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github'
import { labelAPI, Repo } from './api'
import { Config, Options, PRContext, IssueContext } from './types'
import { utils, labelHandler, contextHandler } from './utils'

const context = github.context

/**
 * Super Labeler
 * @method Run The function called by ./index to run the Action
 * @method _log Logging to console
 * @author IvanFon, TGTGamer
 * @since 1.0.0
 */
export default class SuperLabeler {
  client: GitHub
  opts: Options

  /**
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  constructor(client: GitHub, options: Options) {
    this.client = client
    this.opts = options
  }

  _log(message: string) {
    if (!this.opts.showLogs) return
    console.log(message)
  }

  /**
   * Runs the Action
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async run() {
    try {
      const configPath = this.opts.configPath
      const dryRun = this.opts.dryRun
      const repo = context.repo

      /**
       * Get the configuration
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      if (!fs.existsSync(configPath)) {
        throw new Error(`config not found at "${configPath}"`)
      }
      const config: Config = JSON.parse(fs.readFileSync(configPath).toString())
      core.debug(`Config: ${JSON.stringify(config)}`)

      /**
       * Handle the context
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      let curContext:
        | { type: 'pr'; context: PRContext }
        | { type: 'issue'; context: IssueContext }

      if (context.payload.pull_request) {
        const ctx = await contextHandler.parsePR(context, this.client, repo)
        if (!ctx) {
          throw new Error('pull request not found on context')
        }
        core.debug(`PR context: ${JSON.stringify(ctx)}`)
        curContext = {
          type: 'pr',
          context: ctx
        }
      } else if (context.payload.issue) {
        const ctx = contextHandler.parseIssue(context)
        if (!ctx) {
          throw new Error('issue not found on context')
        }
        core.debug(`issue context: ${JSON.stringify(ctx)}`)

        curContext = {
          type: 'issue',
          context: ctx
        }
      } else {
        return
      }

      /**
       * Syncronise labels to repository
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      await labelHandler
        .syncLabels({
          client: this.client,
          repo,
          config: config.labels,
          dryRun
        })
        .catch((err: { message: string | Error }) => {
          core.debug('Error thrown while handling syncLabels tasks')
          core.error(err.message)
          core.setFailed(err.message)
        })

      // Mapping of label ids to Github names
      const labelIdToName = Object.entries(config.labels).reduce(
        (acc: { [key: string]: string }, cur) => {
          acc[cur[0]] = cur[1].name
          return acc
        },
        {}
      )

      /**
       * Apply labels to context
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      if (curContext.type === 'pr') {
        await labelHandler
          .applyPR({
            client: this.client,
            config: config.pr,
            labelIdToName,
            prContext: curContext.context,
            repo,
            dryRun
          })
          .catch((err: { message: string | Error }) => {
            core.debug('Error thrown while handling PRLabel tasks')
            core.error(err.message)
            core.setFailed(err.message)
          })
      } else if (curContext.type === 'issue') {
        await labelHandler
          .applyIssue({
            client: this.client,
            config: config.issue,
            issueContext: curContext.context,
            labelIdToName,
            repo,
            dryRun
          })
          .catch((err: { message: string | Error }) => {
            core.debug('Error thrown while handling issueLabel tasks')
            core.error(err.message)
            core.setFailed(err.message)
          })
      }
    } catch (err) {
      core.error(err.message)
      core.setFailed(err.message)
    }
  }
}

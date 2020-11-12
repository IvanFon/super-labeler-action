import fs from 'fs'
import * as github from '@actions/github'
import { GitHub } from '@actions/github'
import { Config, Options, PRContext, IssueContext } from './types'
import { labelHandler, contextHandler } from './utils'
import { log } from './'

let local: any
let context = github.context

try {
  local = require('../config.json')
  process.env.GITHUB_REPOSITORY = local.GITHUB_REPOSITORY
  process.env.GITHUB_REPOSITORY_OWNER = local.GITHUB_REPOSITORY_OWNER
  if (!context.payload.issue && !context.payload.pull_request)
    context = require(local.github_context)
} catch {}

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
    log(`Superlabeller Constructed: ${options}`, 1)
    this.client = client
    this.opts = options
  }

  /**
   * Runs the Action
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async run() {
    try {
      const configJSON = this.opts.configJSON
      const configPath = this.opts.configPath
      const dryRun = this.opts.dryRun
      const repo = context.repo || {}
      if (dryRun) repo.repo = process.env.GITHUB_REPOSITORY || 'Unknown'
      if (dryRun) repo.owner = process.env.GITHUB_REPOSITORY_OWNER || 'Unknown'

      log(`Repo data: ${repo.owner}/${repo.repo}`, 1)

      /**
       * Capture and log context to debug for Local Running
       * @author TGTGamer
       * @since 1.0.0
       */

      log(
        `Context for local running. See readme.md for information on how to setup local running: ${JSON.stringify(
          context
        )}`,
        1
      )

      /**
       * Get the configuration
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      let config: Config
      if (!configJSON) {
        if (!fs.existsSync(configPath)) {
          throw new Error(`config not found at "${configPath}"`)
        }
        config = await JSON.parse(fs.readFileSync(configPath).toString())
        log(`Config: ${JSON.stringify(config)}`, 1)
      } else {
        config = configJSON
      }

      /**
       * Handle the context
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      let curContext:
        | { type: 'pr'; context: PRContext }
        | { type: 'issue'; context: IssueContext }

      if (context.payload.pull_request) {
        const ctx = await contextHandler
          .parsePR(context, this.client, repo)
          .catch(err => {
            log(`Error thrown while parsing PR context: ` + err, 5)
            throw err
          })
        if (!ctx) {
          throw new Error('Pull Request not found on context')
        }
        log(`PR context: ${JSON.stringify(ctx)}`, 1)
        curContext = {
          type: 'pr',
          context: ctx
        }
      } else if (context.payload.issue) {
        const ctx = await contextHandler.parseIssue(context).catch(err => {
          log(`Error thrown while parsing issue context: ` + err, 5)
          throw err
        })
        if (!ctx) {
          throw new Error('Issue not found on context')
        }
        log(`issue context: ${JSON.stringify(ctx)}`, 1)

        curContext = {
          type: 'issue',
          context: ctx
        }
      } else {
        log(
          `There is no context to parse: ${JSON.stringify(context.payload)}`,
          3
        )
        throw new Error('There is no context')
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
          log(`Error thrown while handling syncLabels tasks: ${err.message}`, 5)
        })

      // Mapping of label ids to Github names
      const labelIdToName = await Object.entries(config.labels).reduce(
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
            log(`Error thrown while handling PRLabel tasks: ${err.message}`, 5)
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
            log(
              `Error thrown while handling issueLabel tasks: ${err.message}`,
              5
            )
          })
      }
    } catch (err) {
      log(`Error in supper labeler: ` + err.message, 5)
    }
  }
}

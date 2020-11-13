import fs from 'fs'
import * as github from '@actions/github'
import { GitHub } from '@actions/github'
import { CurContext, Config, Options, labelIdToName } from './types'
import { labelHandler } from './labelHandler'
import { contextHandler } from './contextHandler'
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
  configJSON: Options['configJSON']
  configPath: Options['configPath']
  dryRun: Options['dryRun']
  repo = context.repo || {}

  /**
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  constructor(client: GitHub, options: Options) {
    log(`Superlabeller Constructed: ${options}`, 1)
    this.client = client
    this.opts = options
    this.configJSON = options.configJSON
    this.configPath = options.configPath
    this.dryRun = options.dryRun
  }

  /**
   * Runs the Action
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async run() {
    if (this.dryRun) this.repo.repo = process.env.GITHUB_REPOSITORY || 'Unknown'
    if (this.dryRun)
      this.repo.owner = process.env.GITHUB_REPOSITORY_OWNER || 'Unknown'
    log(`Repo data: ${this.repo.owner}/${this.repo.repo}`, 1)

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
     * Process the config
     * @author TGTGamer
     * @since 1.1.0
     */
    const configs = await this.processConfig().catch(err => {
      log(`Error thrown while processing config: ` + err, 5)
      throw err
    })
    log(`Config: ${JSON.stringify(configs)}`, 1)

    /**
     * Get the context
     * @author TGTGamer
     * @since 1.1.0
     */
    const curContext = await this.processContext().catch(err => {
      log(`Error thrown while processing context: ` + err, 5)
      throw err
    })

    /**
     * Combine the Shared & Context.type Configs
     * @author TGTGamer
     * @since 1.1.0
     */
    for (const config in configs.shared) {
      if (!configs[curContext.type][config]) {
        configs[curContext.type][config] = configs.shared[config]
      }
    }

    /**
     * Syncronise the labels
     * @author TGTGamer
     * @since 1.1.0
     */
    await this.syncLabels(configs).catch(err => {
      log(`Error thrown while syncronising labels: ` + err, 5)
      throw err
    })

    /**
     * Convert label ID's to Names
     * @author TGTGamer
     * @since 1.1.0
     */
    const labelIdToName: labelIdToName = await Object.entries(
      configs.labels
    ).reduce((acc: { [key: string]: string }, cur) => {
      acc[cur[0]] = cur[1].name
      return acc
    }, {})

    /**
     * Apply the context
     * @author TGTGamer
     * @since 1.1.0
     */
    await this.applyContext(curContext, configs, labelIdToName).catch(err => {
      log(`Error thrown while applying context: ` + err, 5)
      throw err
    })
  }

  /**
   * Get the configuration
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async processConfig(): Promise<Config> {
    if (!this.configJSON) {
      if (!fs.existsSync(this.configPath)) {
        throw new Error(`config not found at "${this.configPath}"`)
      }
      return await JSON.parse(fs.readFileSync(this.configPath).toString())
    } else {
      return this.configJSON
    }
  }

  /**
   * Handle the context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async processContext() {
    let curContext: CurContext

    if (context.payload.pull_request) {
      /**
       * Pull Request Context
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
      const ctx = await contextHandler
        .parsePR(context, this.client, this.repo)
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
      /**
       * Issue Context
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
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
      /**
       * No Context
       * @author TGTGamer
       * @since 1.1.0
       */
      log(`There is no context to parse: ${JSON.stringify(context.payload)}`, 3)
      throw new Error('There is no context')
    }
    return curContext
  }

  /**
   * Syncronise labels to repository
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async syncLabels(config: Config) {
    await labelHandler
      .syncLabels({
        client: this.client,
        repo: this.repo,
        config: config.labels,
        dryRun: this.dryRun
      })
      .catch((err: { message: string | Error }) => {
        log(`Error thrown while handling syncLabels tasks: ${err.message}`, 5)
      })
  }

  /**
   * Apply labels to context
   * @author IvanFon, TGTGamer, jbinda
   * @since 1.0.0
   */
  async applyContext(
    curContext: CurContext,
    config: Config,
    labelIdToName: labelIdToName
  ) {
    if (curContext.type === 'pr') {
      await labelHandler
        .applyPR({
          client: this.client,
          config: config.pr,
          labelIdToName,
          prContext: curContext.context,
          repo: this.repo,
          dryRun: this.dryRun
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
          repo: this.repo,
          dryRun: this.dryRun
        })
        .catch((err: { message: string | Error }) => {
          log(`Error thrown while handling issueLabel tasks: ${err.message}`, 5)
        })
    }
  }
}

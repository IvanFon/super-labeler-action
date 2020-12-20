import * as core from '@actions/core'
import { loggingData } from '@videndum/utilities'
import { log } from '..'
import { Config, PullRequestConfig, Runners } from '../../types'
import { CurContext, PRContext } from '../conditions'
import { Utils } from '../utils'
import { Contexts } from './methods'

export class PullRequests extends Contexts {
  context: PRContext
  config: PullRequestConfig
  constructor(
    util: Utils,
    runners: Runners,
    configs: Config,
    curContext: CurContext,
    dryRun: boolean
  ) {
    if (curContext.type !== 'pr')
      throw new loggingData('500', 'Cannot construct without issue context')
    super(util, runners, configs, curContext, dryRun)
    this.context = curContext.context
    if (!configs.pr) throw new loggingData('500', 'Cannot start without config')
    this.config = configs.pr
  }

  async run(attempt?: number) {
    if (!this.config) throw new Error('Cannot start without config')
    if (!attempt) {
      attempt = 1
      core.startGroup('Pull Request Actions')
    }
    let seconds = attempt * 10
    try {
      await this.applyLabels(this).catch(err => {
        log(new loggingData('500', 'Error applying labels', err))
      })
      core.endGroup()
    } catch (err) {
      if (attempt > 3) {
        core.endGroup()
        throw log(
          new loggingData(
            '800',
            `Pull Request actions failed. Terminating job.`
          )
        )
      }
      log(
        new loggingData(
          '400',
          `Pull Request Actions failed with "${err}", retrying in ${seconds} seconds....`
        )
      )
      attempt++
      setTimeout(async () => {
        this.newVersion = await this.util.versioning.parse(
          this.configs,
          this.config?.ref || this.context.ref
        )
        this.run(attempt)
      }, seconds * 1000)
    }
  }
}

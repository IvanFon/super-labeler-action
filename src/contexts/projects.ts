import * as core from '@actions/core'
import { loggingData } from '@videndum/utilities'
import { log } from '..'
import { Config, ProjectConfig, Runners } from '../../types'
import { CurContext, ProjectContext } from '../conditions'
import { Utils } from '../utils'
import { Contexts } from './methods'
export class Project extends Contexts {
  context: ProjectContext
  config: ProjectConfig
  constructor(
    util: Utils,
    runners: Runners,
    configs: Config,
    curContext: CurContext,
    dryRun: boolean
  ) {
    if (curContext.type !== 'project')
      throw new loggingData('500', 'Cannot construct without issue context')
    super(util, runners, configs, curContext, dryRun)
    this.context = curContext.context
    if (!configs.project)
      throw new loggingData('500', 'Cannot start without config')
    this.config = configs.project
  }

  async run(attempt?: number) {
    if (!this.config)
      throw new loggingData('500', 'Cannot start without config')
    if (!attempt) {
      attempt = 1
      core.startGroup('project Actions')
    }
    let seconds = attempt * 10

    try {
      core.endGroup()
    } catch (err) {
      if (attempt > 3) {
        core.endGroup()
        throw log(
          new loggingData('800', `project actions failed. Terminating job.`)
        )
      }
      log(
        new loggingData(
          '400',
          `project Actions failed with "${err}", retrying in ${seconds} seconds....`
        )
      )
      attempt++
      setTimeout(async () => {
        this.run(attempt)
      }, seconds * 1000)
    }
  }
}

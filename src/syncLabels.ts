import * as core from '@actions/core'
import { GitHub } from '@actions/github'

import { Config } from './types'
import { createLabel, getLabels, Repo, updateLabel } from './api'
import { formatColor } from './utils'

const syncLabels = async ({
  client,
  config,
  repo,
  dryRun,
}: {
  client: GitHub
  config: Config['labels']
  repo: Repo
  dryRun: boolean
}) => {
  const curLabels = await getLabels({ client, repo })
  core.debug(`curLabels: ${JSON.stringify(curLabels)}`)

  for (const _configLabel of Object.values(config)) {
    const configLabel = {
      ..._configLabel,
      color: _configLabel.color,
    }

    const curLabel = curLabels.filter((l) => l.name === configLabel.name)
    if (curLabel.length > 0) {
      const label = curLabel[0]
      if (
        label.description !== configLabel.description ||
        label.color !== formatColor(configLabel.color)
      ) {
        core.debug(
          `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
            label,
          )})`,
        )
        try {
          await updateLabel({ client, repo, label: configLabel, dryRun })
        } catch (e) {
          core.error(`Label update error: ${e.message}`)
        }
      }
    } else {
      core.debug(`Create ${JSON.stringify(configLabel)}`)
      try {
        await createLabel({ client, repo, label: configLabel, dryRun })
      } catch (e) {
        core.debug(`Label Creation failed: ${e.message}`)
      }
    }
  }
}

export default syncLabels

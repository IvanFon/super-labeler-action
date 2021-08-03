import { LoggingLevels } from '@videndum/utilities'
import { Utils } from '.'
import { log } from '..'
import { Labels, Runners } from '../../types'
import { formatColor } from './parsingData'

/**
 * Syncronise labels to repository
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */
export async function sync(this: Utils, config: Runners['labels']) {
  /**
   * Syncronises the repo labels
   * !todo Add delete labels
   * @since 2.0.0
   */
  if (!config) throw new Error('Cannot syncronise labels without config')
  const curLabels: Labels = await this.api.labels.get().catch(err => {
    throw log(
      LoggingLevels.error, `Error thrown while getting labels: ` + err)
  })
  log(LoggingLevels.debug, `curLabels: ${JSON.stringify(curLabels)}`)
  for (const configLabel of Object.values(config)) {
    const label = curLabels[configLabel.name.toLowerCase()]

    /**
     * Update label
     * @author IvanFon, TGTGamer, jbinda
     * @since 1.0.0
     */
    if (label) {
      if (
        label.name !== configLabel.name ||
        (label.description !== configLabel.description &&
          configLabel.description !== undefined) ||
        label.color !== formatColor(configLabel.color)
      ) {
        log(
            LoggingLevels.info,
            `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
              label
            )})`
        )
        await this.api.labels.update(configLabel).catch(err => {
          log(
            LoggingLevels.error, `Error thrown while updating label: ` + err)
        })
      } else {
        log(
          LoggingLevels.info,
            `No action required to update label: ${label.name}`
        )
      }

      /**
       * Create label
       * @author IvanFon, TGTGamer, jbinda
       * @since 1.0.0
       */
    } else {
      log(LoggingLevels.info, `Create ${JSON.stringify(configLabel)}`)
      await this.api.labels.create(configLabel).catch(err => {
        log(LoggingLevels.error, `Error thrown while creating label: ` + err)
      })
    }
  }

  if (this.skipDelete) {
    log(LoggingLevels.warn, 'Skipping deletion of labels')
  } else {
    for (const curLabel of Object.values(curLabels)) {
      const label = config[curLabel.name.toLowerCase()]
      if (!label) {
        log(LoggingLevels.warn, `Delete ${JSON.stringify(curLabel)}`)
        await this.api.labels.del(curLabel.name).catch(err => {
          log(LoggingLevels.error, `Error thrown while deleting label: ` + err)
        })
      }
    }
  }
}

/**
 * Add or Remove Labels
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */
export async function addRemove(
  this: Utils,
  curLabels: Labels | undefined,
  labelID: string,
  labelName: string,
  IDNumber: number,
  hasLabel: boolean,
  shouldHaveLabel: boolean
) {
  if (!curLabels || !labelName)
    return log(
      LoggingLevels.info,
        `Can't run add or remove labels if you don't provide ${
          !curLabels
            ? `the current labels ${curLabels}`
            : `the name of the label you want to apply: ${labelName}`
        }`
    )
  log(
    LoggingLevels.debug,
      `Current label: ${labelName.toLowerCase()} -- Does issue have label: ${Boolean(
        hasLabel
      )} but should it: ${shouldHaveLabel}`
  )
  if (shouldHaveLabel && !hasLabel) {
    log(LoggingLevels.info, `Adding label "${labelID}"...`)
    await this.api.labels.add(IDNumber, labelName).catch(err => {
      log(LoggingLevels.error, `Error thrown while adding labels: ` + err)
    })
  } else if (!shouldHaveLabel && hasLabel) {
    log(LoggingLevels.info, `Removing label "${labelID}"...`)
    await this.api.labels.remove(IDNumber, labelName).catch(err => {
      log(LoggingLevels.error, `Error thrown while removing labels: ` + err)
    })
  } else {
    log(
      LoggingLevels.info,
        `No action required for label "${labelID}"${
          hasLabel ? ' as label is already applied.' : '.'
        }`
      )
  }
}

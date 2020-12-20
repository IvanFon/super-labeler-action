import { loggingData } from '@videndum/utilities'
import path from 'path'
import { Utils } from '.'
import { log } from '..'
import { Config } from '../../types'
import { Version } from '../conditions'

/**
 * Gets the version information
 * @author IvanFon, TGTGamer
 * @since 1.0.0
 */
export async function parse(
  this: Utils,
  config: Config,
  ref?: string
): Promise<Version> {
  let rawVersion
  if (config.projectType === 'node') {
    rawVersion = await getNodeVersion
      .call(this, config.root, ref)
      .catch(err => {
        log(
          new loggingData(
            '500',
            `Error thrown while parsing node project: ` + err
          )
        )
        throw err
      })
  } else {
    throw new Error("There isn't any version to use")
  }
  if (!rawVersion) rawVersion = '0.0.0'

  if (config.versioning == 'SemVer' || config.versioning == undefined) {
    let SemVer = rawVersion.split('.')
    let versioning: Version['semantic'] = {
      major: +SemVer[0],
      minor: +SemVer[1],
      patch: +SemVer[2].split('+')[0].split('-')[0],
      prerelease: rawVersion.split('-')[1]?.split('+')[0],
      build: +rawVersion.split('+')[1]
    }
    return { semantic: versioning }
  }
  return { name: rawVersion }
}

export async function getNodeVersion(
  this: Utils,
  root: string,
  ref?: string
): Promise<string> {
  const file = path.join(root, '/package.json')
  log(new loggingData('100', `Getting file: ${file}`))
  return JSON.parse(await this.api.files.get(file, ref)).version
}

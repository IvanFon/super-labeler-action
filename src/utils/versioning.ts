/** @format */

import { LoggingLevels } from "@videndum/utilities"
import path from "path"
import { Utils } from "."
import { log } from ".."
import { Config } from "../action"
import { Version } from "../conditions"

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
	if (!config.root) config.root = "master"
	if (config.versioning?.source == "node") {
		rawVersion = await getNodeVersion
			.call(this, config.root, ref)
			.catch((err) => {
				log(
					LoggingLevels.error,
					`Error thrown while parsing node project: ` + err
				)
				throw err
			})
	} else if (config.versioning?.source == "milestones") {
		// todo: Add milestone passing
	} else {
		if (config.versioning?.source) rawVersion = config.versioning.source
		else throw new Error("There isn't any version to use")
	}

	if (!rawVersion) rawVersion = "0.0.0"
	if (config.versioning?.type == "SemVer" || !config.versioning.type) {
		const SemVer = rawVersion.split(".")
		const plus = SemVer[2]?.split("+")
		const patch = plus?.[0]?.split("-")?.[0]
		if (!SemVer || !SemVer[0] || !SemVer[1] || !SemVer[2] || !patch)
			throw new Error("SemVer versioning is not valid")
		const versioning: Version["semantic"] = {
			major: +SemVer[0],
			minor: +SemVer[1],
			patch: +patch,
			prerelease: rawVersion.split("-")?.[1]?.split("+")?.[0],
			build: plus && plus[1] ? +plus[1] : undefined
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
	const file = path.join(root, "/package.json")
	log(LoggingLevels.debug, `Getting file: ${file}`)
	return JSON.parse(await this.api.files.get(file, ref)).version
}

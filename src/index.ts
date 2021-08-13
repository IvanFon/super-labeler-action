/** @format */

import * as core from "@actions/core"
import { getOctokit } from "@actions/github"
import {
	Logger,
	LoggingDataClass,
	LoggingLevels,
	LoggingOptions,
	LogReturn
} from "@videndum/utilities"
import path from "path"
import Action, { Runners } from "./action"
import { Repo } from "./utils"
export * from "./action"
export * from "./conditions"
export * from "./contexts"
export * from "./evaluator"
export * from "./utils"

/**
 * Logging system used throughout the package.
 * @private
 */

const L = new Logger({
	logger: {
		console: { enabled: false },
		sentry: {
			enabled: process.env.NPM_PACKAGE_SENTRY ? true : false,
			config: {
				dsn: process.env.NPM_PACKAGE_SENTRY!
			}
		}
	}
})
/**
 * Logging function used throught the package.
 * @private
 */
export async function log(
	name: LoggingLevels,
	message: string,
	options?: LoggingOptions
): Promise<LogReturn> {
	const data = new LoggingDataClass(name, message, options)
	const type = Number(name) / 100
	if (type == 1) core.debug(message)
	else if (type < 4) core.info(message)
	else if (type == 4) core.warning(message)
	else if (type < 7) core.error(message)
	else core.setFailed(message)
	return L.log(data)
}

let local: any = undefined
let dryRun: boolean
let showLogs = false
let repo: Repo | undefined = undefined

try {
	local = require("../config.json")
	dryRun = local.GH_ACTION_LOCAL_TEST || core.getInput("dryRun") || false
	showLogs = local.SHOW_LOGS || false
	repo =
		{
			repo: local.GITHUB_REPOSITORY,
			owner: local.GITHUB_REPOSITORY_OWNER
		} || undefined
} catch (err) {
	log(LoggingLevels.emergency, err.message, { errors: err })
}

const { GITHUB_WORKSPACE = "" } = process.env

/**
 * Runs the action
 * @author TGTGamer
 * @since 1.0.0
 */
async function run() {
	if (dryRun)
		log(
			LoggingLevels.notice,
			`${process.env.NPM_PACKAGE_NAME} is running in local dryrun mode. No Actions will be applyed`
		)
	const configInput = JSON.parse(
		core.getInput("configJSON") === "" ? "{}" : core.getInput("configJSON")
	)
	const GITHUB_TOKEN =
		core.getInput("GITHUB_TOKEN") ||
		(local == undefined ? undefined : local.GITHUB_TOKEN)
	if (!GITHUB_TOKEN) {
		return core.setFailed("No Token provided")
	}
	const fillEmpty = Boolean(core.getInput("fillEmpty") || local.FILL)
	const skipDelete = Boolean(core.getInput("skipDelete") || local.SKIPDELETE)
	const options: Options = {
		configPath: path.join(GITHUB_WORKSPACE, core.getInput("config")),
		configJSON:
			configInput.releaseMastermind ||
			(configInput.pr || configInput.issue || configInput.project
				? configInput
				: local == undefined
				? undefined
				: /* eslint-disable @typescript-eslint/no-var-requires */
				require(local.configJSON).releaseMastermind
				? require(local.configJSON).releaseMastermind
				: require(local.configJSON)),
		/* eslint-enable @typescript-eslint/no-var-requires */
		showLogs,
		dryRun,
		fillEmpty,
		skipDelete,
		repo
	}
	const action = new Action(getOctokit(GITHUB_TOKEN), options)
	action.run().catch((err) => {
		log(
			LoggingLevels.emergency,
			`${process.env.NPM_PACKAGE_NAME} did not complete due to error:`,
			err
		)
	})
}
run()

/**
 * The application options used within Github Actions workflows
 */
export interface Options {
	/**
	 * The path to find the config
	 */
	configPath: string
	/**
	 * The json configuration object
	 */
	configJSON: Runners
	/**
	 * Should show logs?
	 */
	showLogs: boolean
	/**
	 * should dry run?
	 */
	dryRun: boolean
	/**
	 * Should fill empty values?
	 */
	fillEmpty: boolean
	/**
	 * Should skip delete of labels
	 */
	skipDelete: boolean
	/**
	 * The repo to use
	 */
	repo?: Repo
}

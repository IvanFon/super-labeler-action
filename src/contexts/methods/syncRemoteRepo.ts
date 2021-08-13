/** @format */

import { SharedConditions } from "../../conditions"

/**
 * Sync Remote configuration
 */
export interface SyncRemote {
	/**
	 * local branch to sync
	 */
	localBranch: string
	/**
	 * remote branch to sync
	 */
	remoteBranch: string
	/**
	 * The path to the local files to sync
	 */
	localPath: string
	/**
	 * The path to the remote file destination
	 */
	remotePath: string
	/**
	 * The conditions to use when syncing
	 */
	conditions: SharedConditions[]
}

// export async function syncRemote(dryRun: boolean) {}

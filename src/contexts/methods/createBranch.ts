/** @format */

/**
 * Create branch on project configuration
 */

export interface ProjectCreateBranch extends CreateBranch {
	/**
	 * Project to use
	 */
	onProject?: string
	/**
	 * Column to use
	 */
	onColumn?: string
}

/**
 * Create branch configuration
 */
export interface CreateBranch {
	/**
	 * The branch prefix
	 */
	branchPrefix?: string
	/**
	 * The branch suffix
	 */
	branchSuffix?: string
	/**
	 * The branch name type
	 */
	branchName: "title" | "short" | "number"
}

/** @format */

/**
 * Assign to milestone based on project
 */

export interface Milestones {
	/**
	 * Which column o use
	 */
	onColumn: string
	/**
	 * Which labels should e ignored?
	 */
	ignoreLabels?: string[]
}

/**
 * Create Milestones
 */
export interface CreateMilestone {
	/**
	 * The milestone you want to use
	 */
	milestone: "version" | string
	/**
	 * The date in which you want to set as the completion date
	 */
	deadline?: string
}

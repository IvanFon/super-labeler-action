/** @format */
import { SharedConventionsConfig } from "./conventions"

/**
 * Automatic Approval configuration
 */
export interface AutomaticApprove {
	/**
	 * The comment to append to the header
	 */
	commentHeader?: string
	/**
	 * The comment to append to the footer
	 */
	commentFooter?: string
	/**
	 * The conventions to use when approving
	 */
	conventions: SharedConventionsConfig[]
}

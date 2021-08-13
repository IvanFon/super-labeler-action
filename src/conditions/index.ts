/** @format */

export { log } from "../"
export * from "./issue"
export * from "./pr"
export * from "./project"
export * from "./schedule"
export * from "./util"

import { Labels } from "../action"
import { Issues, Project, PullRequests, Schedule } from "../contexts"
import { IssueCondition } from "./issue"
import { PRCondition } from "./pr"
import { ProjectCondition } from "./project"
import { ScheduleCondition } from "./schedule"
import { Condition } from "./util"

/**
 * @private
 */
export type CurContext =
	| { type: "pr"; context: PRContext }
	| { type: "issue"; context: IssueContext }
	| { type: "project"; context: ProjectContext }
	| { type: "schedule"; context: ScheduleContext }

/**
 * @private
 */
export interface PRContext extends GeneralContext {
	currentVersion: Version
	IDNumber: number
	props: PRProps
}

/**
 * @private
 */
export interface IssueContext extends GeneralContext {
	currentVersion: Version
	IDNumber: number
	props: IssueProps
}

/**
 * @private
 */
export interface ProjectContext extends GeneralContext {
	currentVersion: Version
	IDNumber: number
	props: ProjectProps
}

/**
 * @private
 */
export interface ScheduleContext extends GeneralContext {
	props?: ScheduleProps
}
interface GeneralContext {
	ref?: string
	sha: string
	action: string
}

/**
 * @private
 */
interface Props {
	creator: string
	description: string
	locked: boolean
	state: "open" | "closed"
	title: string
	labels?: Labels
	ID: number
	type: "issue" | "pr" | "project"
	lastUpdated?: string
}

/**
 * @private
 */
export interface PRProps extends Props {
	branch: string
	isDraft: boolean
	files: string[]
	reviews: Reviews
	pendingReview: boolean
	requestedChanges: number
	approved: number
	changes: number
}

/**
 * @private
 */
export type IssueProps = Props

/**
 * @private
 */
export interface ProjectProps extends Props {
	project: any
	column_id: number
	localCard: Partial<localCard>
	localColumn: localColumn
	changes: {
		column_id: {
			from: number
		}
	}
}

/**
 * @private
 */
export type ScheduleProps = Props

/**
 * @private
 */
export interface Version {
	name?: string
	semantic?: {
		major: number
		minor: number
		patch: number
		prerelease?: string
		build?: number
	}
}

/**
 * @private
 */
export type Reviews = Review[]

/**
 * @private
 */
export interface Review {
	id?: number
	node_id?: string
	user?: any
	body?: string
	state?: "APPROVED" | "" | string
	html_url?: string
	pull_request_url?: string
	author_association?: string
	_links?: {}
	submitted_at?: string
	commit_id?: string
}

/**
 * @private
 */
interface localCard {
	archived: boolean
	column_url: string
	content_url: string
	created_at: string
	creator: any
	id: number
	node_id: string
	note: string | null
	project_url: string
	updated_at: string
	url: string
}

/**
 * @private
 */
interface localColumn {
	name: any
	cards_url: string
	created_at: string
	id: number
	node_id: string
	project_url: string
	updated_at: string
	url: string
}
/**
 * This instead of manually requiring this
 * @private
 */
export type UtilThis = Issues | PullRequests | Project | Schedule
/**
 * Props used instead of manually requiring props
 * @private
 */
export type UtilProps = IssueProps | PRProps | ProjectProps | ScheduleProps

/**
 * Shared conditions used by all types of events.
 */
export interface SharedConditions {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed
	 */
	conditions: Condition[]
}

/**
 * Conventions to use
 */
export interface SharedConventionConditions {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed. You can use the "semanticTitle" to automatically apply thses conditions
	 */
	conditions: Condition[] | string
}

/**
 * The PR condition configuration
 */
export interface PRConditionConfig {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed
	 */
	conditions: PRCondition[]
}

/**
 * The Issue condition configuration
 */
export interface IssueConditionConfig {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed
	 */
	conditions: IssueCondition[]
}

/**
 * The Project condition configuration
 */
export interface ProjectConditionConfig {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed
	 */
	conditions: ProjectCondition[]
}

/**
 * The Schedule condition configuration
 */
export interface ScheduleConditionConfig {
	/**
	 * The number of requires needed for this to succeed
	 */
	requires: number
	/**
	 * The conditions required for this to succeed
	 */
	conditions: ScheduleCondition[]
}

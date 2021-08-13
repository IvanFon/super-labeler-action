/** @format */
import { PRConditionConfig } from "../../conditions"
import { Changelog } from "./changelog"
import { CreateMilestone } from "./handleMilestone"

/**
 * The release configuration
 */
export interface Release extends PRConditionConfig {
	/**
	 * The labels to use to detect release type (semantic release)
	 */
	labels?: {
		/**
		 * The label to use to mark a build
		 */
		build: string
		/**
		 * The label to use to mark a prerelease
		 */
		prerelease: string
		/**
		 * The label to use to mark a patch
		 */
		patch: string
		/**
		 * The label to use to mark a minor
		 */
		minor: string
		/**
		 * The label to use to mark a major
		 */
		major: string

		/**
		 * The label to use to mark a breaking change
		 */
		breaking?: string
	}
	/**
	 * Should the release create a tag?
	 */
	createTag?: boolean
	/**
	 * Should the release create a Github Release?
	 */
	createRelease?: CreateRelease
	/**
	 * Should the release create the next milestone?
	 */
	createMilestone?: CreateMilestone
	/**
	 * Should the release create a Github Package?
	 */
	createPackages?: string[] | string
	/**
	 * Should the release create a changelog?
	 */
	createChangelog?: Changelog
}

/**
 *
 */
export interface ReleaseChanges {
	/**
	 * Should include issues?
	 */
	includeIssues?: boolean
	/**
	 * The section configuration
	 */
	sections?: Sections[]
}

/**
 * The section configuration
 */
export interface Sections {
	/**
	 * The title of this section
	 */
	title: string
	/**
	 * The body of this section
	 */
	body?: string
	/**
	 * The pull request labels to include
	 */
	PRlabels: string[]
	/**
	 * The issue labels to include
	 */
	issueLabels?: string[]
	/**
	 *  Should include the committer username?
	 */
	includeCommitter?: boolean
	/**
	 * Should link the Pull Request?
	 */
	linkPR?: boolean
}

/**
 * The create release configuration
 */
export interface CreateRelease extends ReleaseChanges {
	/**
	 * The name of the tag to create
	 */
	tagName?: string
	/**
	 * The prefix before the tagName
	 */
	tagPrefix?: string
	/**
	 * The name of the release to create
	 */
	releaseName?: string
	/**
	 * The prefix before the releaseName
	 */
	releaseNamePrefix?: string
	/**
	 * The sufix to add to the release name
	 */
	releaseNameSuffix?: string
	/**
	 * Should be a draft?
	 */
	draft?: boolean
	/**
	 * Should release be a prerelease?
	 */
	prerelease?: boolean
	/**
	 * Should the release use the generated changelog?
	 */
	useChangelog?: boolean
}

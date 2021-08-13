/** @format */

import { Event, Utils } from ".."
import { Reviews } from "../../conditions"

export async function list(this: Utils, IDNumber: number) {
	const files = await this.client.rest.pulls.listFiles({
		...this.repo,
		pull_number: IDNumber,
		per_page: 100
	})
	return files.data.map((file) => file.filename)
}

export async function changes(Additions: number, deletions: number) {
	return Additions + deletions
}

export const reviews = {
	async create(
		this: Utils,
		IDNumber: number,
		body?: string,
		event?: Event,
		comments?: any
	) {
		const reviews = await this.client.rest.pulls.createReview({
			...this.repo,
			pull_number: IDNumber,
			body,
			event,
			comments
		})
		return reviews.data
	},
	async update(this: Utils, IDNumber: number, review_id: number, body: string) {
		const reviews = await this.client.rest.pulls.updateReview({
			...this.repo,
			pull_number: IDNumber,
			review_id,
			body
		})
		return reviews.data
	},
	async dismiss(
		this: Utils,
		IDNumber: number,
		review_id: number,
		message: string
	) {
		const reviews = await this.client.rest.pulls.dismissReview({
			...this.repo,
			pull_number: IDNumber,
			review_id,
			message
		})
		return reviews.data
	},

	async list(this: Utils, IDNumber: number) {
		const reviews = await this.client.rest.pulls.listReviews({
			...this.repo,
			pull_number: IDNumber,
			per_page: 100
		})
		return reviews.data
	},

	async pending(reviews: number, requested_reviews: number) {
		return reviews < requested_reviews
	},

	async requestedChanges(reviews: Reviews) {
		let changes = 0
		reviews.forEach((review) => {
			if (review.state == "CHANGES_REQUESTED") changes++
		})
		return changes
	},

	async isApproved(reviews: Reviews) {
		let approved = 0
		reviews.forEach((review) => {
			if (review.state == "APPROVED") approved++
		})
		return approved
	}
}

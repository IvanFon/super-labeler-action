/** @format */

import { Utils } from ".."

export const column = {
	async list(this: Utils, project_id: number) {
		return (
			await this.client.rest.projects.listColumns({
				project_id
			})
		).data
	},
	async get(this: Utils, column_id: number) {
		return (
			await this.client.rest.projects.getColumn({
				column_id
			})
		).data
	},
	async listCards(this: Utils, column_id: number) {
		return (
			await this.client.rest.projects.listCards({
				column_id
			})
		).data
	}
}
export const card = {
	async get(this: Utils, card_id: number) {
		return (
			await this.client.rest.projects.getCard({
				card_id
			})
		).data
	},
	async create(
		this: Utils,
		content_id: number,
		column_id: number,
		content_type?: "Issue" | "PullRequest"
	) {
		return (
			await this.client.rest.projects.createCard({
				content_id,
				column_id,
				content_type
			})
		).data
	},
	async move(this: Utils, card_id: number, column_id: number) {
		return this.client.rest.projects.moveCard({
			card_id,
			column_id,
			position: "top"
		})
	}
}

export const projects = {
	async get(this: Utils, project_id: number) {
		return (
			await this.client.rest.projects.get({
				project_id
			})
		).data
	},
	async org(this: Utils, org: string) {
		return (
			await this.client.rest.projects.listForOrg({
				org
			})
		).data
	},
	async user(this: Utils, username: string) {
		return (
			await this.client.rest.projects.listForUser({
				username
			})
		).data
	},
	async repo(this: Utils, owner: string, repository: string) {
		return (
			await this.client.rest.projects.listForRepo({
				owner,
				repo: repository
			})
		).data
	}
}

/** @format */

import { Tags, Utils } from ".."

export async function get(this: Utils): Promise<Tags> {
	const tags = (
		await this.client.rest.repos.listTags({
			...this.repo
		})
	).data
	return tags.map((tag) => tag.name)
}

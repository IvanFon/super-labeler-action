/** @format */

import { Utils } from ".."
import { Label, Labels } from "../../action"

export async function add(this: Utils, IDNumber: number, label: string) {
	if (!this.dryRun)
		await this.client.rest.issues.addLabels({
			...this.repo,
			issue_number: IDNumber,
			labels: [label]
		})
}

export async function create(this: Utils, label: Label) {
	const color = this.parsingData.formatColor(label.color)
	if (!this.dryRun)
		await this.client.rest.issues.createLabel({ ...this.repo, ...label, color })
}

export async function del(this: Utils, name: string) {
	if (!this.dryRun)
		await this.client.rest.issues.deleteLabel({
			...this.repo,
			name
		})
}

export async function get(this: Utils): Promise<Labels> {
	const labels = (
		await this.client.rest.issues.listLabelsForRepo({
			...this.repo
		})
	).data

	const labelsMap = labels.map((label) => ({
		name: label.name,
		description: label.description != null ? label.description : undefined,
		color: label.color
	}))

	return labelsMap.reduce((acc: { [key: string]: Label }, cur) => {
		acc[cur.name.toLowerCase()] = cur
		return acc
	}, {})
}

export async function remove(this: Utils, IDNumber: number, label: string) {
	if (!this.dryRun)
		await this.client.rest.issues.removeLabel({
			...this.repo,
			issue_number: IDNumber,
			name: label
		})
}

export async function update(this: Utils, current_name: string, label: Label) {
	const color = this.parsingData.formatColor(label.color)
	if (!this.dryRun)
		await this.client.rest.issues.updateLabel({
			...this.repo,
			current_name,
			name: label.name,
			description: label.description,
			color
		})
}

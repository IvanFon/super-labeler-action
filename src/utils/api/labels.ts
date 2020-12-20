import { Utils } from '..'
import { Label, Labels } from '../../../types'

export async function add(this: Utils, IDNumber: number, label: string) {
  if (!this.dryRun)
    await this.client.issues.addLabels({
      ...this.repo,
      issue_number: IDNumber,
      labels: [label]
    })
}

export async function create(this: Utils, label: Label) {
  const color = this.parsingData.formatColor(label.color)
  if (!this.dryRun)
    await this.client.issues.createLabel({ ...this.repo, ...label, color })
}

export async function del(this: Utils, name: string) {
  if (!this.dryRun)
    await this.client.issues.deleteLabel({
      ...this.repo,
      name
    })
}

export async function get(this: Utils): Promise<Labels> {
  const options = await this.client.issues.listLabelsForRepo.endpoint.merge({
    ...this.repo
  })
  const labels = await this.client.paginate(options)
  const labelsMap = labels.map(label => ({
    name: label.name,
    description: label.description,
    color: label.color
  }))

  return labelsMap.reduce((acc: { [key: string]: Label }, cur) => {
    acc[cur.name.toLowerCase()] = cur
    return acc
  }, {})
}

export async function remove(this: Utils, IDNumber: number, label: string) {
  if (!this.dryRun)
    await this.client.issues.removeLabel({
      ...this.repo,
      issue_number: IDNumber,
      name: label
    })
}

export async function update(this: Utils, label: Label) {
  const color = this.parsingData.formatColor(label.color)
  if (!this.dryRun)
    await this.client.issues.updateLabel({
      ...this.repo,
      current_name: label.name,
      description: label.description,
      color
    })
}

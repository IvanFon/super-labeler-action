import { IssueApiProps, ApiProps } from '.'
import { Label, Labels } from '../parseContext'
import { formatColor } from '../utils'

class labels {
  async add({
    client,
    repo,
    IDNumber,
    label,
    dryRun
  }: IssueApiProps & {
    label: string
    dryRun: boolean
  }) {
    if (!dryRun)
      await client.issues.addLabels({
        ...repo,
        issue_number: IDNumber,
        labels: [label]
      })
  }

  async create({
    client,
    repo,
    label,
    dryRun
  }: ApiProps & { label: Label; dryRun: boolean }) {
    const color = formatColor(label.color)
    if (!dryRun) await client.issues.createLabel({ ...repo, ...label, color })
  }

  async deleteLabel({
    client,
    repo,
    name,
    dryRun
  }: ApiProps & { name: string; dryRun: boolean }) {
    if (!dryRun)
      await client.issues.deleteLabel({
        ...repo,
        name
      })
  }

  async get({ client, repo }: ApiProps): Promise<Labels> {
    const options = await client.issues.listLabelsForRepo.endpoint.merge({
      ...repo
    })
    const labels = await client.paginate(options)
    return labels.map(label => ({
      name: label.name,
      description: label.description,
      color: label.color
    }))
  }

  async remove({
    client,
    repo,
    IDNumber,
    label,
    dryRun
  }: IssueApiProps & {
    label: string
    dryRun: boolean
  }) {
    if (!dryRun)
      await client.issues.removeLabel({
        ...repo,
        issue_number: IDNumber,
        name: label
      })
  }

  async update({
    client,
    repo,
    label,
    dryRun
  }: ApiProps & { label: Label; dryRun: boolean }) {
    const color = formatColor(label.color)
    if (!dryRun)
      await client.issues.updateLabel({
        ...repo,
        current_name: label.name,
        description: label.description,
        color
      })
  }
}

export const labelAPI = new labels()

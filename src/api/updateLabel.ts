import { ApiProps } from '.'
import { Label } from '../parseContext'
import { formatColor } from '../utils'

export const updateLabel = async ({
  client,
  repo,
  label,
  dryRun,
}: ApiProps & { label: Label; dryRun: boolean }) => {
  const color = formatColor(label.color)
  !dryRun &&
    (await client.issues.updateLabel({
      ...repo,
      current_name: label.name,
      description: label.description,
      color,
    }))
}

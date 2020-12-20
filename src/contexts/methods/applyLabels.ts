import { loggingData } from '@videndum/utilities'
import { Issues, Project, PullRequests } from '..'
import { log } from '../..'
import { evaluator } from '../../evaluator'

export async function applyLabels(this: Issues | PullRequests | Project) {
  if (!this.config?.labels || !this.configs.labels)
    throw new loggingData('500', 'Config is required to add labels')
  const { props } = this.context
  for (const [labelID, conditionsConfig] of Object.entries(
    this.config.labels
  )) {
    log(new loggingData('100', `Label: ${labelID}`))

    const shouldHaveLabel = evaluator.call(this, conditionsConfig, props)

    const labelName = this.configs.labels[labelID]
    if (!labelName)
      throw new loggingData(
        '500',
        `Can't find configuration for ${labelID} within labels. Check spelling and that it exists`
      )
    const hasLabel = Boolean(
      this.context.props.labels?.[labelName.toLowerCase()]
    )
    if (!shouldHaveLabel && hasLabel && this.context.props.labels)
      delete this.context.props.labels[labelName.toLowerCase()]
    if (
      shouldHaveLabel &&
      !hasLabel &&
      this.context.props.labels &&
      this.runners.labels
    )
      this.context.props.labels[labelName.toLowerCase()] = this.runners.labels[
        labelID
      ]

    await this.util.labels
      .addRemove(
        labelID,
        labelName,
        this.context.props.ID,
        hasLabel,
        shouldHaveLabel,
        this.context.props.labels
      )
      .catch(err => {
        log(
          new loggingData(
            '500',
            `Error thrown while running addRemoveLabel: ` + err
          )
        )
      })
  }
}

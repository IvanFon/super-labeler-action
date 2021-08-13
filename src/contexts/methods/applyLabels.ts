/** @format */

import { LoggingDataClass, LoggingLevels } from "@videndum/utilities"
import { log } from "../.."
import { UtilThis } from "../../conditions"
import { evaluator } from "../../evaluator"

export async function applyLabels(this: UtilThis) {
	if (!this.config?.labels || !this.configs.labels)
		throw new LoggingDataClass(
			LoggingLevels.error,
			"Config is required to add labels"
		)
	for (const [labelID, conditionsConfig] of Object.entries(
		this.config.labels
	)) {
		if (!this.context.props) throw new Error("Props are required")
		log(LoggingLevels.debug, `Label: ${labelID}`)

		const shouldHaveLabel = evaluator.call(
			this,
			conditionsConfig,
			this.context.props
		)

		const labelName = this.configs.labels[labelID]
		if (!labelName)
			throw new LoggingDataClass(
				LoggingLevels.error,
				`Can't find configuration for "${labelID}" within labels. Check spelling and that it exists`
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
		) {
			const l = this.runners.labels[labelID]
			if (l) this.context.props.labels[labelName.toLowerCase()] = l
		}

		await this.util.labels
			.addRemove(labelName, this.context.props.ID, hasLabel, shouldHaveLabel)
			.catch((err) => {
				log(
					LoggingLevels.error,
					`Error thrown while running addRemoveLabel: ` + err
				)
			})
	}
}

/** @format */

import { Label, Labels } from "../action"

/**
 * Formats the hex color code to ensure no hash (#) is included
 * @author IvanFon, TGTGamer
 * @param {String} color Hex color code
 * @since 1.0.0
 */
export const formatColor = (color: string) => {
	if (color.charAt(0) === "#") {
		return color.substr(1)
	} else {
		return color
	}
}

/**
 * Formats the hex color code to ensure no hash (#) is included
 * @author IvanFon, jbinda
 * @param {String} pattern Regex partern to use
 * @since 1.0.0
 */
export const processRegExpPattern = (pattern: string) => {
	const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/)

	const [, source, flags] = matchDelimiters || []

	return new RegExp(source || pattern, flags)
}

/**
 * Normalizes text toUpperCase
 * @author IvanFon, TGTGamer
 * @since 1.0.0
 */
export const normalize = (text: string) => (text || "").toUpperCase()

/**
 * Parse the labels
 * @author IvanFon, TGTGamer, jbinda
 * @since 1.0.0
 */
export const parseLabels = async (labels: any): Promise<Labels | undefined> => {
	if (!Array.isArray(labels)) {
		return
	}
	return labels.reduce((acc: { [key: string]: Label }, cur) => {
		acc[cur.name.toLowerCase()] = cur
		return acc
	}, {})
}

/** @format */
import { ReleaseChanges } from "./release"
/**
 * Changelog
 */
export interface Changelog extends ReleaseChanges {
	/**
	 * The changelog title
	 */
	title?: string
	/**
	
 * The changelog body (before the sections)
	 */
	body?: string
}

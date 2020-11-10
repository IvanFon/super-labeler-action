'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.processRegExpPattern = exports.formatColour = void 0
exports.formatColour = colour => {
  if (colour.charAt(0) === '#') {
    return colour.substr(1)
  } else {
    return colour
  }
}
exports.processRegExpPattern = pattern => {
  const matchDelimiters = pattern.match(/^\/(.*)\/(.*)$/)
  const [, source, flags] = matchDelimiters || []
  return new RegExp(source || pattern, flags)
}

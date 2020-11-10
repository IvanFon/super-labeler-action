'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const utils_1 = require('../utils')
const TYPE = 'creatorMatches'
const creatorMatches = (condition, issue) => {
  const pattern = utils_1.processRegExpPattern(condition.pattern)
  return pattern.test(issue.creator)
}
exports.default = [TYPE, creatorMatches]

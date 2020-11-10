'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const TYPE = 'isDraft'
const isDraft = (condition, pr) => {
  return pr.isDraft === condition.value
}
exports.default = [TYPE, isDraft]

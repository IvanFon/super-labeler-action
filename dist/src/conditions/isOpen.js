'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const utils_1 = require('../utils')
const TYPE = 'isOpen'
var States
;(function (States) {
  States['Open'] = 'OPEN'
  States['Closed'] = 'CLOSED'
})(States || (States = {}))
const isOpen = (condition, issue) => {
  return (
    utils_1.normalize(issue.state) ===
    utils_1.normalize(condition.value ? States.Open : States.Closed)
  )
}
exports.default = [TYPE, isOpen]

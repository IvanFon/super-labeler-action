'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const TYPE = 'isLocked'
const isLocked = (condition, issue) => issue.locked === condition.value
exports.default = [TYPE, isLocked]

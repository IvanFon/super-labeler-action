'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPRConditionHandler = void 0
const branchMatches_1 = __importDefault(require('./branchMatches'))
const filesMatch_1 = __importDefault(require('./filesMatch'))
const isDraft_1 = __importDefault(require('./isDraft'))
const __1 = require('../')
const handlers = [
  ...__1.handlers,
  branchMatches_1.default,
  filesMatch_1.default,
  isDraft_1.default
]
exports.getPRConditionHandler = condition => {
  const handler = handlers.find(handler => handler[0] === condition.type)
  return handler === null || handler === void 0 ? void 0 : handler[1]
}

'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          }
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !exports.hasOwnProperty(p))
        __createBinding(exports, m, p)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.handlers = void 0
const creatorMatches_1 = __importDefault(require('./creatorMatches'))
const descriptionMatches_1 = __importDefault(require('./descriptionMatches'))
const isLocked_1 = __importDefault(require('./isLocked'))
const isOpen_1 = __importDefault(require('./isOpen'))
const titleMatches_1 = __importDefault(require('./titleMatches'))
exports.handlers = [
  creatorMatches_1.default,
  descriptionMatches_1.default,
  isLocked_1.default,
  isOpen_1.default,
  titleMatches_1.default
]
__exportStar(require('./issue'), exports)
__exportStar(require('./pr'), exports)

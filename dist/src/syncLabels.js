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
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
const core = __importStar(require('@actions/core'))
const api_1 = require('./api')
const utils_1 = require('./utils')
const syncLabels = ({ client, config, repo }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const curLabels = yield api_1.getLabels({ client, repo })
    core.debug(`curLabels: ${JSON.stringify(curLabels)}`)
    for (const _configLabel of Object.values(config)) {
      const configLabel = Object.assign(Object.assign({}, _configLabel), {
        color: _configLabel.colour
      })
      const curLabel = curLabels.filter(l => l.name === configLabel.name)
      if (curLabel.length > 0) {
        const label = curLabel[0]
        if (
          label.description !== configLabel.description ||
          label.color !== utils_1.formatColour(configLabel.color)
        ) {
          core.debug(
            `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
              label
            )})`
          )
          yield api_1.updateLabel({ client, repo, label: configLabel })
        }
      } else {
        try {
          core.debug(`Create ${JSON.stringify(configLabel)}`)
          yield api_1.createLabel({ client, repo, label: configLabel })
        } catch (_) {
          core.debug('Label Creation failed: ' + _)
        }
      }
    }
  })
exports.default = syncLabels

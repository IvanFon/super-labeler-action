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
          },
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
    function adopt (value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled (value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected (value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step (result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.applyPRLabels = exports.applyIssueLabels = void 0
const core = __importStar(require('@actions/core'))
const api_1 = require('./api')
const conditions_1 = require('./conditions')
const forConditions = (conditions, callback) => {
  let matches = 0
  for (const condition of conditions) {
    core.debug(`Condition: ${JSON.stringify(condition)}`)
    if (callback(condition)) {
      matches++
    }
  }
  core.debug(`Matches: ${matches}`)
  return matches
}
const addRemoveLabel = ({
  client,
  curLabels,
  label,
  labelIdToName,
  matches,
  num,
  repo,
  requires,
}) =>
  __awaiter(void 0, void 0, void 0, function * () {
    const labelName = labelIdToName[label]
    const hasLabel = curLabels.filter((l) => l.name === labelName).length > 0
    if (matches >= requires && !hasLabel) {
      core.debug(
        `${matches} >= ${requires} matches, adding label "${label}"...`,
      )
      yield api_1.addLabel({ client, repo, num, label: labelName })
    }
    if (matches < requires && hasLabel) {
      core.debug(
        `${matches} < ${requires} matches, removing label "${label}"...`,
      )
      yield api_1.removeLabel({ client, repo, num, label: labelName })
    }
  })
exports.applyIssueLabels = ({
  client,
  config,
  issueContext,
  labelIdToName,
  repo,
}) =>
  __awaiter(void 0, void 0, void 0, function * () {
    const { labels: curLabels, issueProps, num } = issueContext
    for (const [label, opts] of Object.entries(config)) {
      core.debug(`Label: ${label}`)
      const matches = forConditions(opts.conditions, (condition) => {
        const handler = conditions_1.getIssueConditionHandler(condition)
        return (
          (handler === null || handler === void 0
            ? void 0
            : handler(condition, issueProps)) || false
        )
      })
      yield addRemoveLabel({
        client,
        curLabels,
        label,
        labelIdToName,
        matches,
        num,
        repo,
        requires: opts.requires,
      })
    }
  })
exports.applyPRLabels = ({ client, config, labelIdToName, prContext, repo }) =>
  __awaiter(void 0, void 0, void 0, function * () {
    const { labels: curLabels, prProps, num } = prContext
    for (const [label, opts] of Object.entries(config)) {
      core.debug(`Label: ${label}`)
      const matches = forConditions(opts.conditions, (condition) => {
        const handler = conditions_1.getPRConditionHandler(condition)
        return (
          (handler === null || handler === void 0
            ? void 0
            : handler(condition, prProps)) || false
        )
      })
      yield addRemoveLabel({
        client,
        curLabels,
        label,
        labelIdToName,
        matches,
        num,
        repo,
        requires: opts.requires,
      })
    }
  })

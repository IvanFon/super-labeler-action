'use strict'
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
exports.parseIssueContext = exports.parsePRContext = void 0
const api_1 = require('./api')
exports.parsePRContext = (context, client, repo) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const pr = context.payload.pull_request
    if (!pr) {
      return
    }
    const num = pr.number
    const labels = parseLabels(pr.labels)
    const files = yield api_1.listFiles({ client, repo, num })
    return {
      labels,
      num,
      prProps: {
        branch: pr.head.ref,
        creator: pr.user.login,
        description: pr.body || '',
        files,
        isDraft: pr.draft,
        locked: pr.locked,
        state: pr.state,
        title: pr.title
      }
    }
  })
exports.parseIssueContext = context => {
  const issue = context.payload.issue
  if (!issue) {
    return
  }
  const labels = parseLabels(issue.labels)
  return {
    labels,
    num: issue.number,
    issueProps: {
      creator: issue.user.login,
      description: issue.body || '',
      locked: issue.locked,
      state: issue.state,
      title: issue.title
    }
  }
}
const parseLabels = labels => {
  if (!Array.isArray(labels)) {
    return []
  }
  return labels.filter(
    label =>
      typeof label === 'object' &&
      'name' in label &&
      'description' in label &&
      'color' in label
  )
}

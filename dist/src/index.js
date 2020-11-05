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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = __importDefault(require('fs'))
const path_1 = __importDefault(require('path'))
const core = __importStar(require('@actions/core'))
const github = __importStar(require('@actions/github'))
const applyLabels_1 = require('./applyLabels')
const parseContext_1 = require('./parseContext')
const syncLabels_1 = __importDefault(require('./syncLabels'))
const context = github.context
;(() =>
  __awaiter(void 0, void 0, void 0, function * () {
    try {
      // Get inputs
      const token = core.getInput('github-token', { required: true })
      const configPath = path_1.default.join(
        process.env.GITHUB_WORKSPACE,
        core.getInput('config'),
      )
      const repo = context.repo
      const client = new github.GitHub(token)
      // Load config
      if (!fs_1.default.existsSync(configPath)) {
        throw new Error(`config not found at "${configPath}"`)
      }
      const config = JSON.parse(
        fs_1.default.readFileSync(configPath).toString(),
      )
      core.debug(`Config: ${JSON.stringify(config)}`)
      let curContext
      if (context.payload.pull_request) {
        const ctx = yield parseContext_1.parsePRContext(context, client, repo)
        if (!ctx) {
          throw new Error('pull request not found on context')
        }
        core.debug(`PR context: ${JSON.stringify(ctx)}`)
        curContext = {
          type: 'pr',
          context: ctx,
        }
      } else if (context.payload.issue) {
        const ctx = parseContext_1.parseIssueContext(context)
        if (!ctx) {
          throw new Error('issue not found on context')
        }
        core.debug(`issue context: ${JSON.stringify(ctx)}`)
        curContext = {
          type: 'issue',
          context: ctx,
        }
      } else {
        return
      }
      yield syncLabels_1.default({ client, repo, config: config.labels })
      // Mapping of label ids to Github names
      const labelIdToName = Object.entries(config.labels).reduce((acc, cur) => {
        acc[cur[0]] = cur[1].name
        return acc
      }, {})
      if (curContext.type === 'pr') {
        yield applyLabels_1.applyPRLabels({
          client,
          config: config.pr,
          labelIdToName,
          prContext: curContext.context,
          repo,
        })
      } else if (curContext.type === 'issue') {
        yield applyLabels_1.applyIssueLabels({
          client,
          config: config.issue,
          issueContext: curContext.context,
          labelIdToName,
          repo,
        })
      }
    } catch (err) {
      core.error(err.message)
      core.setFailed(err.message)
    }
  }))()

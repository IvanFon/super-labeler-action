"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const applyLabels_1 = require("./applyLabels");
const parseContext_1 = require("./parseContext");
const syncLabels_1 = __importDefault(require("./syncLabels"));
const context = github.context;
class ActionSuperLabeler {
    constructor(client, options) {
        this.client = client;
        this.opts = options;
    }
    _log(message) {
        if (!this.opts.showLogs)
            return;
        console.log(message);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configPath = this.opts.configPath;
                const dryRun = this.opts.dryRun;
                const repo = context.repo;
                if (!fs_1.default.existsSync(configPath)) {
                    throw new Error(`config not found at "${configPath}"`);
                }
                const config = JSON.parse(fs_1.default.readFileSync(configPath).toString());
                core.debug(`Config: ${JSON.stringify(config)}`);
                let curContext;
                if (context.payload.pull_request) {
                    const ctx = yield parseContext_1.parsePRContext(context, this.client, repo);
                    if (!ctx) {
                        throw new Error('pull request not found on context');
                    }
                    core.debug(`PR context: ${JSON.stringify(ctx)}`);
                    curContext = {
                        type: 'pr',
                        context: ctx,
                    };
                }
                else if (context.payload.issue) {
                    const ctx = parseContext_1.parseIssueContext(context);
                    if (!ctx) {
                        throw new Error('issue not found on context');
                    }
                    core.debug(`issue context: ${JSON.stringify(ctx)}`);
                    curContext = {
                        type: 'issue',
                        context: ctx,
                    };
                }
                else {
                    return;
                }
                yield syncLabels_1.default({
                    client: this.client,
                    repo,
                    config: config.labels,
                    dryRun,
                });
                const labelIdToName = Object.entries(config.labels).reduce((acc, cur) => {
                    acc[cur[0]] = cur[1].name;
                    return acc;
                }, {});
                if (curContext.type === 'pr') {
                    yield applyLabels_1.applyPRLabels({
                        client: this.client,
                        config: config.pr,
                        labelIdToName,
                        prContext: curContext.context,
                        repo,
                        dryRun,
                    });
                }
                else if (curContext.type === 'issue') {
                    yield applyLabels_1.applyIssueLabels({
                        client: this.client,
                        config: config.issue,
                        issueContext: curContext.context,
                        labelIdToName,
                        repo,
                        dryRun,
                    });
                }
            }
            catch (err) {
                core.error(err.message);
                core.setFailed(err.message);
            }
        });
    }
}
module.exports = ActionSuperLabeler;

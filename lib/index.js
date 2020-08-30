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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const path_1 = __importDefault(require("path"));
const superLabeler = require('./superLabeler');
const { GITHUB_WORKSPACE = '', SHOW_LOGS, GH_ACTION_LOCAL_TEST } = process.env;
const dryRun = !!GH_ACTION_LOCAL_TEST;
const showLogs = SHOW_LOGS === 'true';
const configFile = core.getInput('config');
const configPath = path_1.default.join(GITHUB_WORKSPACE, configFile);
const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN', {
    required: true,
});
const options = {
    configPath,
    showLogs,
    dryRun,
};
const action = new superLabeler(new github.GitHub(GITHUB_TOKEN), options);
action.run();

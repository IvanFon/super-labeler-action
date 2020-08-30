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
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPRLabels = exports.applyIssueLabels = void 0;
const core = __importStar(require("@actions/core"));
const api_1 = require("./api");
const evaluator_1 = __importStar(require("./conditions/evaluator"));
const addRemoveLabel = ({ client, curLabels, labelID, labelName, IDNumber, repo, shouldHaveLabel, dryRun, }) => __awaiter(void 0, void 0, void 0, function* () {
    const hasLabel = curLabels.filter((l) => l.name === labelName).length > 0;
    if (shouldHaveLabel && !hasLabel) {
        core.debug(`Adding label "${labelID}"...`);
        yield api_1.addLabel({ client, repo, IDNumber, label: labelName, dryRun });
    }
    if (!shouldHaveLabel && hasLabel) {
        core.debug(`Removing label "${labelID}"...`);
        yield api_1.removeLabel({ client, repo, IDNumber, label: labelName, dryRun });
    }
});
exports.applyIssueLabels = ({ client, config, issueContext, labelIdToName, repo, dryRun, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { labels: curLabels, issueProps, IDNumber } = issueContext;
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
        core.debug(`Label: ${labelID}`);
        const shouldHaveLabel = evaluator_1.default(evaluator_1.ConditionSetType.issue, conditionsConfig, issueProps);
        yield addRemoveLabel({
            client,
            curLabels,
            labelID,
            labelName: labelIdToName[labelID],
            IDNumber,
            repo,
            shouldHaveLabel,
            dryRun,
        });
    }
});
exports.applyPRLabels = ({ client, config, labelIdToName, prContext, repo, dryRun, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { labels: curLabels, prProps, IDNumber } = prContext;
    for (const [labelID, conditionsConfig] of Object.entries(config)) {
        core.debug(`Label: ${labelID}`);
        const shouldHaveLabel = evaluator_1.default(evaluator_1.ConditionSetType.issue, conditionsConfig, prProps);
        yield addRemoveLabel({
            client,
            curLabels,
            labelID,
            labelName: labelIdToName[labelID],
            IDNumber,
            repo,
            shouldHaveLabel,
            dryRun,
        });
    }
});

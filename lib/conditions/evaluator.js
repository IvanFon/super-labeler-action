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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionSetType = void 0;
const core = __importStar(require("@actions/core"));
const index_1 = require("./index");
var ConditionSetType;
(function (ConditionSetType) {
    ConditionSetType["issue"] = "issue";
    ConditionSetType["pr"] = "pr";
})(ConditionSetType = exports.ConditionSetType || (exports.ConditionSetType = {}));
const forConditions = (conditions, callback) => {
    let matches = 0;
    for (const condition of conditions) {
        core.debug(`Condition: ${JSON.stringify(condition)}`);
        if (callback(condition)) {
            matches++;
        }
    }
    core.debug(`Matches: ${matches}`);
    return matches;
};
function evaluator(conditionSetType, config, props) {
    const { conditions, requires } = config;
    const matches = forConditions(conditions, (condition) => {
        const handler = conditionSetType === ConditionSetType.issue
            ? index_1.getIssueConditionHandler(condition)
            : index_1.getPRConditionHandler(condition);
        return (handler === null || handler === void 0 ? void 0 : handler(condition, props)) || false;
    });
    return matches >= requires;
}
exports.default = evaluator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const TYPE = 'branchMatches';
const branchMatches = (condition, pr) => {
    const pattern = utils_1.processRegExpPattern(condition.pattern);
    return pattern.test(pr.branch);
};
exports.default = [TYPE, branchMatches];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const TYPE = 'titleMatches';
const titleMatches = (condition, issue) => {
    const pattern = utils_1.processRegExpPattern(condition.pattern);
    return pattern.test(issue.title);
};
exports.default = [TYPE, titleMatches];

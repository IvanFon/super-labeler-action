"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssueConditionHandler = void 0;
const __1 = require("../");
const handlers = [...__1.handlers];
exports.getIssueConditionHandler = (condition) => {
    const handler = handlers.find((handler) => handler[0] === condition.type);
    return handler === null || handler === void 0 ? void 0 : handler[1];
};

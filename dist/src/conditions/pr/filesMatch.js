"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = require("minimatch");
const TYPE = 'filesMatch';
const filesMatch = (condition, pr) => minimatch_1.match(pr.files, condition.glob).length > 0;
exports.default = [TYPE, filesMatch];

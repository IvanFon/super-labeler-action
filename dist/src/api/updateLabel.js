"use strict";
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
exports.updateLabel = void 0;
const utils_1 = require("../utils");
exports.updateLabel = ({ client, repo, label, }) => __awaiter(void 0, void 0, void 0, function* () {
    const color = utils_1.formatColour(label.color);
    yield client.issues.updateLabel(Object.assign(Object.assign({}, repo), { current_name: label.name, description: label.description, color }));
});

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
exports.listFiles = void 0;
exports.listFiles = ({ client, IDNumber, repo }) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield client.pulls.listFiles(Object.assign(Object.assign({}, repo), { pull_number: IDNumber, per_page: 100 }));
    return files.data.map((file) => file.filename);
});

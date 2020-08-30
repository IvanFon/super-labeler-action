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
exports.addLabel = void 0;
exports.addLabel = ({ client, repo, IDNumber, label, dryRun, }) => __awaiter(void 0, void 0, void 0, function* () {
    return !dryRun &&
        (yield client.issues.addLabels(Object.assign(Object.assign({}, repo), { issue_number: IDNumber, labels: [label] })));
});

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
const settings = {
    labels: {
        test: {
            name: 'test',
            color: 'CFD3D7',
            description: 'This issue / pull request has been abandon',
        },
    },
    issue: {
        bug: {
            requires: 1,
            conditions: [
                {
                    type: 'titleMatches',
                    pattern: '/^bug(\\(.*\\))?:/i',
                },
                {
                    type: 'descriptionMatches',
                    pattern: '/(created|new|opened|made)( an| a)? bug/i',
                },
            ],
        },
    },
    pr: {
        bug: {
            requires: 1,
            conditions: [
                {
                    type: 'titleMatches',
                    pattern: '/^bug(\\(.*\\))?:/i',
                },
                {
                    type: 'descriptionMatches',
                    pattern: '/(created|new|opened|made)( an| a)? bug/i',
                },
            ],
        },
    },
};
test('test colour format', () => __awaiter(void 0, void 0, void 0, function* () {
    yield expect(formatColour(settings.labels.test.color)).toBe('CFD3D7');
}));
test('test colour format', () => __awaiter(void 0, void 0, void 0, function* () {
    yield expect(formatColour(`#${settings.labels.test.color}`)).toBe('CFD3D7');
}));

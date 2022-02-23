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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneRandomWord = exports.getAllWords = void 0;
const words_1 = __importDefault(require("../words"));
const sample_1 = __importDefault(require("../utils/sample"));
const getAllWords = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ words: words_1.default });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllWords = getAllWords;
const getOneRandomWord = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomWord = (0, sample_1.default)(words_1.default);
        return res.status(200).json({ word: randomWord });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getOneRandomWord = getOneRandomWord;
//# sourceMappingURL=words.controllers.js.map
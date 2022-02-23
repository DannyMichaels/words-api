"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const words_controllers_1 = require("../controllers/words.controllers");
const router = (0, express_1.default)();
router.get(['/words', '/words/all'], words_controllers_1.getAllWords); // GET
router.get('/words/random', words_controllers_1.getOneRandomWord); // GET
exports.default = router;
//# sourceMappingURL=words.routes.js.map
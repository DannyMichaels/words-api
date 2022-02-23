"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const words_routes_1 = __importDefault(require("./routes/words.routes"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)()); // security with express-helmet
    app.use(express_1.default.json()); // because body-parser is deprecated
    app.use((0, morgan_1.default)('dev'));
    app.use('/api', words_routes_1.default);
    return app;
}
exports.default = createServer;
//# sourceMappingURL=server.js.map
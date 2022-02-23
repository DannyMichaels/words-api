"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 3000;
const app = (0, server_1.default)();
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening at port ${PORT}`);
});
//# sourceMappingURL=index.js.map
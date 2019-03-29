"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 5000;
server_1.default.listen(port, () => console.log(`\n** API running on http://localhost:${port} **\n`));
//# sourceMappingURL=index.js.map
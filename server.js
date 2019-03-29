"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const server = express_1.default();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
server.use(helmet_1.default());
server.use(express_1.default.json());
server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);
server.use('/', (req, res) => {
    res.status(200).json({ message: "yup it works." });
});
exports.default = server;
//# sourceMappingURL=server.js.map
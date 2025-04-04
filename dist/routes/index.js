"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.projectRouter = exports.clientRouter = void 0;
var clientRouter_1 = require("./clientRouter");
Object.defineProperty(exports, "clientRouter", { enumerable: true, get: function () { return __importDefault(clientRouter_1).default; } });
var projectRouter_1 = require("./projectRouter");
Object.defineProperty(exports, "projectRouter", { enumerable: true, get: function () { return __importDefault(projectRouter_1).default; } });
var userRoutes_1 = require("./userRoutes");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(userRoutes_1).default; } });

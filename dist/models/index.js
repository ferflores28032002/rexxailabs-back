"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const project_1 = __importDefault(require("./project"));
const user_1 = __importDefault(require("./user"));
exports.default = [user_1.default, project_1.default, client_1.default];

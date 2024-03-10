"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logger = (req, res, next) => {
    console.log(`${chalk_1.default.green(req.method)} ${chalk_1.default.red(req.url)}`);
    next();
};
exports.logger = logger;

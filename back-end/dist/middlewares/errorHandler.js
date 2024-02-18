"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: error.message
    });
};
exports.errorHandler = errorHandler;

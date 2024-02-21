"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(400).send(err.message);
        });
    };
};
exports.asyncWrapper = asyncWrapper;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(400).render('Error', { error: err, title: 'Error' });
        });
    };
};
exports.asyncWrapper = asyncWrapper;

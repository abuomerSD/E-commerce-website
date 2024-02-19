"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(400).json({
                status: 'fail',
                data: err,
            });
            next();
        });
        // try {
        //     fn(req, res, next);
        // } catch (error) {
        //     res.status(400).json({
        //         status: 'fail',
        //         data: error,
        //     })
        // }
    };
};
exports.asyncWrapper = asyncWrapper;

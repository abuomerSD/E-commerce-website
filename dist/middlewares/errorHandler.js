"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const categories = [];
    console.log(error);
    res.status(400).render('Error', { error: error, title: 'Error', categories });
};
exports.errorHandler = errorHandler;

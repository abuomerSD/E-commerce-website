"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            let categories;
            database_1.Category.findAll().then(result => categories = result);
            res.status(400).render('Error', { error: err, title: 'Error', categories });
        });
    };
};
exports.asyncWrapper = asyncWrapper;

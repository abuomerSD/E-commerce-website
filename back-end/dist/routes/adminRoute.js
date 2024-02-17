"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
exports.adminRouter = (0, express_1.Router)();
const productsArray = [
    {
        name: 'product 1',
        price: 1000
    },
    {
        name: 'product 2',
        price: 2000
    },
    {
        name: 'product 3',
        price: 3000
    }
];
exports.adminRouter.route('/products').get((req, res) => {
    res.json(productsArray);
});

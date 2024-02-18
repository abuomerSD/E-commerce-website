"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.route('/products').post(productsController_1.saveProduct);

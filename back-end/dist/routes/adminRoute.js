"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const categoryController_1 = require("../controllers/categoryController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'back-end/uploads/' });
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.route('/products').post(productsController_1.saveProduct);
exports.adminRouter.route('/categories').post(upload.single('image'), categoryController_1.saveCategory);

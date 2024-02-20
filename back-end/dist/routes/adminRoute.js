"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
exports.adminRouter = (0, express_1.Router)();
const productsController_1 = require("../controllers/productsController");
const categoryController_1 = require("../controllers/categoryController");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products-images');
    },
    filename: function (req, file, cb) {
        const fileExtention = file.mimetype.split('/')[1];
        const fileName = `product-${Date.now()}.${fileExtention}`;
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage: storage, fileFilter: function (req, file, cb) {
        const fileType = file.mimetype.split('/')[0];
        if (fileType === 'image')
            cb(null, true);
        else
            cb(null, false);
    }
});
// products routes
exports.adminRouter.route('/products').get(productsController_1.getAllProducts).post(upload.single('image'), productsController_1.saveProduct);
exports.adminRouter.route('/products/:id').get(productsController_1.getProductById).put(upload.single('image'), productsController_1.updateProductById);
// categories routes
exports.adminRouter.route('/categories').post(categoryController_1.saveCategory);

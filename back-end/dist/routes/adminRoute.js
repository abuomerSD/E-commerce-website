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
const controlPanelController_1 = require("../controllers/controlPanelController");
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
// admin control panel routes 
exports.adminRouter.route('/').get(controlPanelController_1.renderAdminHomePage);
// products routes
exports.adminRouter.route('/products')
    .get(controlPanelController_1.renderProductsPage)
    .post(upload.single('image'), productsController_1.saveProduct);
exports.adminRouter.route('/products-filter')
    .post(productsController_1.renderProductsPageWithFilteredProducts);
exports.adminRouter.route('/products/:id')
    .get(productsController_1.getProductById)
    .put(upload.single('image'), productsController_1.updateProductById)
    .delete(productsController_1.delelteProduct);
// categories routes
exports.adminRouter.route('/categories')
    .get(controlPanelController_1.renderCategoriesPage)
    .post(categoryController_1.saveCategory);
exports.adminRouter.route('/categories/:id')
    .get(categoryController_1.getCategoryById)
    .put(categoryController_1.updateCategory)
    .delete(categoryController_1.deleteCategory);

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
const purchaseInvoiceController_1 = require("../controllers/purchaseInvoiceController");
const salesInvoiceController_1 = require("../controllers/salesInvoiceController");
const userController_1 = require("../controllers/userController");
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
        console.log('file size', file.size);
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
exports.adminRouter.route('/searchProduct')
    .post(productsController_1.renderProductsPageWithFilteredProducts);
exports.adminRouter.route('/products/:id')
    .get(productsController_1.getProductById)
    .put(upload.single('image'), productsController_1.updateProductById)
    .delete(productsController_1.delelteProduct);
// this route is only for updating product without updating image
exports.adminRouter.route('/products/updateProductWithoutImage/:id')
    .put(productsController_1.updateProductByIdWithoutImage);
// categories routes
exports.adminRouter.route('/categories')
    .get(controlPanelController_1.renderCategoriesPage)
    .post(categoryController_1.saveCategory);
exports.adminRouter.route('/categories/:id')
    .get(categoryController_1.getCategoryById)
    .put(categoryController_1.updateCategory)
    .delete(categoryController_1.deleteCategory);
exports.adminRouter.route('/categories/searchCategory')
    .post(categoryController_1.renderSearchCategoryPage);
exports.adminRouter.route('/sales-invoices')
    .get(controlPanelController_1.renderSalesInvoicesPage);
exports.adminRouter.route('/sales-invoices/:id')
    .get(salesInvoiceController_1.renderShowSalesInvoice);
exports.adminRouter.route('/purchase-invoices')
    .get(controlPanelController_1.renderPurchaseInvoicesPage);
exports.adminRouter.route('/purchase-invoices/:id')
    .get(purchaseInvoiceController_1.renderShowPurchaseInvoice);
exports.adminRouter.route('/users')
    .post(userController_1.saveUser)
    .get(controlPanelController_1.renderUsersPage);
exports.adminRouter.route('/dashboard')
    .get(controlPanelController_1.renderDashboardPage);
exports.adminRouter.route('/add-purchase-invoice')
    .get(controlPanelController_1.renderAddPurchaseInvoicePage)
    .post(purchaseInvoiceController_1.savePurchaseInvoice);
exports.adminRouter.get('/get-all-sales-invoices', salesInvoiceController_1.getAllSalesInvoicesAsJson);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDashboardPage = exports.renderUsersPage = exports.renderPurchaseInvoicesPage = exports.renderSalesInvoicesPage = exports.renderCategoriesPage = exports.renderProductsPage = exports.renderAdminHomePage = void 0;
const categoryController_1 = require("./categoryController");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const productsController_1 = require("./productsController");
const database_1 = require("../databaseHandler/database");
const contants_1 = require("../utils/contants");
// to chane the page number and products limit change this two values
const defaultPageNumber = contants_1.DEFAULT_PAGE_NUMBER;
const defaultPageLimit = contants_1.DEFAULT_PAGE_LIMIT;
exports.renderAdminHomePage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect('/admin/products');
}));
exports.renderProductsPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // the default page is products page
    let categories = [];
    let products = [];
    let limitedProducts = [];
    let pageNumber = Number(req.query.pageNumber);
    let pageLimit = Number(req.query.pageLimit);
    if (Object.keys(req.query).length === 0) {
        pageNumber = defaultPageNumber;
        pageLimit = defaultPageLimit;
    }
    yield (0, categoryController_1.getAllCategories)().then(result => categories = result);
    yield (0, productsController_1.getAllProducts)().then(result => products = result);
    // limited products by pagination to show in the page
    yield (0, productsController_1.getLimitedByPaginationProducts)(req, pageNumber, pageLimit).then(result => limitedProducts = result);
    res.render('cpProducts', { categories, products, limitedProducts, pageNumber, pageLimit, title: 'Products' });
}));
exports.renderCategoriesPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categories = [];
    let limitedCategories = [];
    let pageNumber = Number(req.query.pageNumber);
    let pageLimit = Number(req.query.pageLimit);
    if (Object.keys(req.query).length === 0) {
        pageNumber = defaultPageNumber;
        pageLimit = defaultPageLimit;
    }
    yield (0, categoryController_1.getAllCategories)().then(result => categories = result);
    yield (0, categoryController_1.getAllCategoriesLimitedByPageLimit)(pageNumber).then(result => limitedCategories = result);
    res.render('cpCategories', { title: 'Categories', categories, limitedCategories, pageLimit, pageNumber });
}));
/**
 * render sales invoices page
 */
exports.renderSalesInvoicesPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    const users = yield database_1.User.findAll();
    const salesInvoicesHeads = yield database_1.SalesInvoiceHead.findAll();
    res.status(200).render('cpSalesInvoices', { title: 'Sales Invoices', categories, users, salesInvoicesHeads });
}));
/**
 * render  purchase invoices page
 */
exports.renderPurchaseInvoicesPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    res.status(200).render('cpPurchaseInvoices', { title: 'Purchase Invoices', categories });
}));
/**
 * render  Users Control page
 */
exports.renderUsersPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    res.status(200).render('cpUsers', { title: 'Users', categories });
}));
/**
 * render  Dashboard page
 */
exports.renderDashboardPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    res.status(200).render('cpDashboard', { title: 'Dashboard', categories });
}));

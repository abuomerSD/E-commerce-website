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
exports.renderProductsPage = exports.renderAdminHomePage = void 0;
const categoryController_1 = require("./categoryController");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const productsController_1 = require("./productsController");
// getAllCategories().then(result => categories = result);
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
        pageNumber = 1;
        pageLimit = 5;
    }
    yield (0, categoryController_1.getAllCategories)().then(result => categories = result);
    yield (0, productsController_1.getAllProducts)().then(result => products = result);
    // limited products by pagination to show in the page
    yield (0, productsController_1.getLimitedByPaginationProducts)(req, pageNumber, pageLimit).then(result => limitedProducts = result);
    res.render('products', { categories, products, limitedProducts, pageNumber, pageLimit, title: 'Products' });
}));

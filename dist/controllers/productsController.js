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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delelteProduct = exports.updateProductByIdWithoutImage = exports.updateProductById = exports.getProductById = exports.renderProductsPageWithFilteredProducts = exports.getLimitedByPaginationProducts = exports.getFilteredProducts = exports.getAllProducts = exports.saveProduct = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const fs_1 = __importDefault(require("fs"));
const httpStatusCodesStates_1 = require("../utils/httpStatusCodesStates");
const categoryController_1 = require("./categoryController");
const sequelize_1 = require("sequelize");
const contants_1 = require("../utils/contants");
// save product
exports.saveProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, category_name, quantity, cost, price } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    // to get the categoryId from given Category name
    let categories = [];
    let categoryId = '';
    yield (0, categoryController_1.getAllCategories)().then(result => categories = result);
    categories.forEach(category => {
        if (category_name === category.name) {
            categoryId = category.id;
        }
    });
    yield database_1.Product.create({ name, categoryId, quantity, cost, price, image }).then((product) => {
        res.status(201).redirect('/admin/products');
        // res.status(201).json({
        //     status: httpStatus.SUCCESS,
        //     data: product,
        // });
    });
}));
// get all products as array 
/**
 *
 * @returns  All Products Array
 */
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    yield database_1.Product.findAll().then((result) => {
        products = result;
        // res.status(200).json({
        //     status: httpStatus.SUCCESS,
        //     data: products,
        // });
    });
    return products;
});
exports.getAllProducts = getAllProducts;
// get filtered products using the search input
const getFilteredProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    const { product_name_search_input } = req.body;
    const name = product_name_search_input;
    yield database_1.Product.findAll({ where: { name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            } } }).then(result => products = result);
    return products;
});
exports.getFilteredProducts = getFilteredProducts;
// get limited products for the pagination
const getLimitedByPaginationProducts = (req, pageNumber, pageLimit) => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    yield database_1.Product.findAll({ limit: pageLimit, offset: (pageNumber - 1) * pageLimit })
        .then(result => products = result);
    return products;
});
exports.getLimitedByPaginationProducts = getLimitedByPaginationProducts;
//  render when using the serach product
exports.renderProductsPageWithFilteredProducts = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limitedProducts = yield (0, exports.getFilteredProducts)(req);
    let products = [];
    let categories = [];
    const searchWords = req.body.product_name_search_input;
    yield (0, exports.getAllProducts)().then(result => products = result);
    yield (0, categoryController_1.getAllCategories)().then(result => categories = result);
    res.render('cpSearchProduct', { categories, limitedProducts, searchWords, title: 'Search Products', pageNumber: contants_1.DEFAULT_PAGE_NUMBER, pageLimit: contants_1.DEFAULT_PAGE_LIMIT });
}));
// get single product by id
exports.getProductById = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.Product.findOne({ where: { id } }).then(product => res.status(200).json({
        status: httpStatusCodesStates_1.httpStatus.SUCCESS,
        data: product,
    }));
}));
// update single product using the id
exports.updateProductById = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const newProduct = req.body;
    newProduct.image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
    let oldProduct = yield database_1.Product.findOne({ where: { id } });
    // to get the categoryId from given Category name
    //   let categories: Array<any> = [];
    //   let categoryId: string = '';
    //   await getAllCategories().then(result => categories = result);
    //   categories.forEach(category => {
    //       if(newProduct.categoryName === category.name) {
    //           categoryId = category.id;
    //       }
    //   })
    // deleting the old image from harddisk to save some space
    yield fs_1.default.unlink(`uploads/products-images/${oldProduct.image}`, (err) => {
        if (err)
            return res.status(400).send(err.stack);
    });
    oldProduct.set(newProduct);
    yield (oldProduct === null || oldProduct === void 0 ? void 0 : oldProduct.save().then((product) => res.status(200).end()));
}));
exports.updateProductByIdWithoutImage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newProduct = req.body;
    let oldProduct = {};
    yield database_1.Product.findOne({ where: { id } }).then(result => {
        oldProduct = result;
    });
    oldProduct === null || oldProduct === void 0 ? void 0 : oldProduct.set(newProduct);
    yield (oldProduct === null || oldProduct === void 0 ? void 0 : oldProduct.save().then((_result) => res.status(200).end()));
}));
// categoryid not updating
exports.delelteProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let oldProduct;
    oldProduct = yield database_1.Product.findOne({ where: { id } });
    // deleting the old image from harddisk to save some space
    yield fs_1.default.unlink(`uploads/products-images/${oldProduct.image}`, (err) => {
        if (err)
            res.status(400).json({ status: 'fail', data: err.message });
    });
    yield database_1.Product.destroy({ where: { id } }).then(rows => {
        res.status(200).end();
    });
    // res.status(200).redirect('/admin/products'));
}));

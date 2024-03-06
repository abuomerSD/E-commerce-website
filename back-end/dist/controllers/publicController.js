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
exports.renderNewReleasePage = exports.renderBestSellersPage = exports.renderCategoryLandingPage = exports.renderProductLandingPage = exports.renderPublicHomePage = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const categoryController_1 = require("./categoryController");
const productsController_1 = require("./productsController");
const database_1 = require("../databaseHandler/database");
const sequelize_1 = __importDefault(require("sequelize"));
const contants_1 = require("../utils/contants");
const bestSellersLimit = contants_1.BEST_SELLERS_LIMIT;
/**
 * render public Home Page
 */
exports.renderPublicHomePage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    const products = yield (0, productsController_1.getAllProducts)();
    res.render('index', { title: 'Home', categories, products });
}));
/**
 * render the product landing page
 */
exports.renderProductLandingPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield database_1.Product.findOne({ where: { id } });
    const categories = yield database_1.Category.findAll();
    // updating viewedTimes 
    if (product) {
        yield product.increment('viewedTimes');
    }
    // render product landing page
    res.render('productLandingPage', { title: product === null || product === void 0 ? void 0 : product.name, product, categories });
}));
/**
 * render catgeory landing page
 */
exports.renderCategoryLandingPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield database_1.Category.findOne({ where: { id }, include: { model: database_1.Product } });
    res.render('categoryLandingPage', { title: category === null || category === void 0 ? void 0 : category.name, category });
}));
/**
 * render best sellers page
 */
exports.renderBestSellersPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield database_1.Product.findAll({
        order: [
            [sequelize_1.default.fn('max', sequelize_1.default.col('saledTimes')), 'DESC']
        ],
        limit: bestSellersLimit,
        group: ['Product.id']
    });
    const categories = yield database_1.Category.findAll();
    res.render('bestSellers', { title: 'Best Sellers', products, categories });
}));
/**
 * render New Releases page
 */
exports.renderNewReleasePage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield database_1.Product.findAll({
        order: sequelize_1.default.col('createdAt'),
        group: ['Product.id'],
    });
    res.render('newReleases', { title: 'New Releases', products });
}));

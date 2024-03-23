"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getCartByUserId = exports.getProductByIdAtPublicRoute = exports.renderCartPage = exports.renderSignupPage = exports.renderLoginPage = exports.renderPublicProductSearchPage = exports.renderNewReleasePage = exports.renderBestSellersPage = exports.renderCategoryLandingPage = exports.renderProductLandingPage = exports.renderPublicHomePage = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const categoryController_1 = require("./categoryController");
const productsController_1 = require("./productsController");
const database_1 = require("../databaseHandler/database");
const sequelize_1 = __importStar(require("sequelize"));
const contants_1 = require("../utils/contants");
const bestSellersLimit = contants_1.BEST_SELLERS_LIMIT;
const jwtSecret = process.env.JWT_SECRECT;
const maxAge = contants_1.MAX_AGE;
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
    const categories = yield database_1.Category.findAll();
    res.render('categoryLandingPage', { title: category === null || category === void 0 ? void 0 : category.name, category, categories });
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
    const categories = yield database_1.Category.findAll();
    res.render('newReleases', { title: 'New Releases', products, categories });
}));
/**
 * renser public search product page when using navbar search group to find products
 */
exports.renderPublicProductSearchPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const products = yield database_1.Product.findAll({ where: { name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            } } });
    const categories = yield database_1.Category.findAll();
    const searchWords = name;
    res.render('publicSearchProduct', { title: 'Search for Products', products, categories, searchWords });
}));
exports.renderLoginPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.Category.findAll();
    res.render('login', { title: 'Login', categories });
}));
exports.renderSignupPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.Category.findAll();
    res.render('signup', { title: 'Sign Up', categories });
}));
exports.renderCartPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('cart', { title: 'Cart' });
}));
exports.getProductByIdAtPublicRoute = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield database_1.Product.findOne({ where: { id } });
    res.status(200).json(product);
    console.log(product);
}));
exports.getCartByUserId = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const cart = yield database_1.CartHead.findOne({ where: { userId }, include: {
            model: database_1.CartDetails,
        } });
    res.status(200).json(cart);
}));

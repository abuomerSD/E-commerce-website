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
exports.renderProductLandingPage = exports.renderPublicHomePage = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const categoryController_1 = require("./categoryController");
const productsController_1 = require("./productsController");
const database_1 = require("../databaseHandler/database");
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
    console.log('*'.repeat(20));
    // render product landing page
    res.render('productLandingPage', { title: product === null || product === void 0 ? void 0 : product.name, product });
    // updating viewedTimes 
    if (product) {
        yield product.increment('viewedTimes');
    }
}));

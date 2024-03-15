"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicCategoriesRoute = exports.publicProductsRoute = exports.publicRouter = void 0;
const express_1 = require("express");
const publicController_1 = require("../controllers/publicController");
const userController_1 = require("../controllers/userController");
exports.publicRouter = (0, express_1.Router)();
exports.publicProductsRoute = (0, express_1.Router)();
exports.publicCategoriesRoute = (0, express_1.Router)();
exports.publicRouter.route('/')
    .get(publicController_1.renderPublicHomePage);
exports.publicRouter.route('/bestSellers')
    .get(publicController_1.renderBestSellersPage);
exports.publicRouter.route('/newReleases')
    .get(publicController_1.renderNewReleasePage);
exports.publicRouter.route('/products/:id')
    .get(publicController_1.renderProductLandingPage);
exports.publicRouter.route('/categories/:id')
    .get(publicController_1.renderCategoryLandingPage);
exports.publicRouter.post('/searchProducts', publicController_1.renderPublicProductSearchPage);
exports.publicRouter.route('/login')
    .get(publicController_1.renderLoginPage);
exports.publicRouter.route('/logout')
    .get(publicController_1.logout);
exports.publicRouter.route('/signup')
    .get(publicController_1.renderSignupPage)
    .post(userController_1.saveUser);
exports.publicRouter.route('/signup/confirmation')
    .get(userController_1.renderUserConfirmatoinPage);
exports.publicRouter.route('/signup/confirmation/:userId')
    .get(userController_1.activateUser);
exports.publicRouter.route('/users')
    .get(userController_1.getAllUsers);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicCategoriesRoute = exports.publicProductsRoute = exports.publicRouter = void 0;
const express_1 = require("express");
const publicController_1 = require("../controllers/publicController");
exports.publicRouter = (0, express_1.Router)();
exports.publicProductsRoute = (0, express_1.Router)();
exports.publicCategoriesRoute = (0, express_1.Router)();
exports.publicRouter.route('/')
    .get(publicController_1.renderPublicHomePage);
exports.publicProductsRoute.route('/:id')
    .get(publicController_1.renderProductLandingPage);
exports.publicCategoriesRoute.route('/:id')
    .get(publicController_1.renderCategoryLandingPage);

import { Router } from "express";
import { renderCategoryLandingPage, renderProductLandingPage, renderPublicHomePage } from "../controllers/publicController";
export const publicRouter = Router();
export const publicProductsRoute = Router();
export const publicCategoriesRoute = Router();

publicRouter.route('/')
    .get(renderPublicHomePage);

publicProductsRoute.route('/:id')
    .get(renderProductLandingPage);

publicCategoriesRoute.route('/:id')
    .get(renderCategoryLandingPage);


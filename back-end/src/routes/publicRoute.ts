import { Router } from "express";
import { renderBestSellersPage, renderNewReleasePage,renderCategoryLandingPage, renderProductLandingPage, renderPublicHomePage, renderPublicProductSearchPage } from "../controllers/publicController";
export const publicRouter = Router();
export const publicProductsRoute = Router();
export const publicCategoriesRoute = Router();

publicRouter.route('/')
    .get(renderPublicHomePage);

publicRouter.route('/bestSellers')
    .get(renderBestSellersPage);
publicRouter.route('/newReleases')
    .get(renderNewReleasePage)

publicRouter.route('/products/:id')
    .get(renderProductLandingPage);

publicRouter.route('/categories/:id')
    .get(renderCategoryLandingPage);

publicRouter.post('/searchProducts', renderPublicProductSearchPage);


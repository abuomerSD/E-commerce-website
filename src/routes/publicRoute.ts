import { Router } from "express";
import { renderBestSellersPage, renderNewReleasePage,renderCategoryLandingPage, renderProductLandingPage, renderPublicHomePage, renderPublicProductSearchPage, renderLoginPage , renderSignupPage} from "../controllers/publicController";
import { activateUser, getAllUsers, login, logout, renderUserConfirmatoinPage, saveUser } from "../controllers/userController";
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

publicRouter.route('/login')
    .get(renderLoginPage)
    .post(login);

publicRouter.route('/logout')
    .get(logout);

publicRouter.route('/signup')
    .get(renderSignupPage)
    .post(saveUser);

publicRouter.route('/signup/confirmation')
    .get(renderUserConfirmatoinPage);

publicRouter.route('/signup/confirmation/:userId')
    .get(activateUser);

publicRouter.route('/users')
    .get(getAllUsers);

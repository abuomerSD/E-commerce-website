import { Router } from "express";
import { renderBestSellersPage, renderNewReleasePage,renderCategoryLandingPage, renderProductLandingPage, renderPublicHomePage, renderPublicProductSearchPage, renderLoginPage , renderSignupPage, renderCartPage, getProductByIdAtPublicRoute} from "../controllers/publicController";
import { activateUser, getAllUsers, login, logout, renderEnterYouEmailPage, renderPasswordResetPage, renderUserConfirmatoinPage, saveUser, sendPasswordResetConfirmationEmail, updateUser } from "../controllers/userController";
import { deleteItemFromCart, getCartByUserId, saveCartItem } from "../controllers/cartController";
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

publicRouter.route('/users/password-reset/enter-your-email')
    .get(renderEnterYouEmailPage)
    .post(sendPasswordResetConfirmationEmail)

publicRouter.route('/users/password-reset/:userId')
    .get(renderPasswordResetPage)
    .post(updateUser);

publicRouter.route('/cart/cart-details/:userId')
    .get(renderCartPage);

publicRouter.route('/cart/cart-details/')
    .delete(deleteItemFromCart);

publicRouter.route('/product/:id')
    .get(getProductByIdAtPublicRoute);

publicRouter.route('/cart/:userId')
    .get(getCartByUserId)
    .post(saveCartItem);
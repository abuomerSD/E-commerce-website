import { Router } from "express";
import { renderProductLandingPage, renderPublicHomePage } from "../controllers/publicController";
export const publicRouter = Router();
export const publicProductsRoute = Router();

publicRouter.route('/')
    .get(renderPublicHomePage);

publicProductsRoute.route('/:id')
    .get(renderProductLandingPage);


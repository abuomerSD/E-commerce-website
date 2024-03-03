import { Router } from "express";
import { renderProductLandingPage, renderPublicHomePage } from "../controllers/publicController";
export const publicRouter = Router();

publicRouter.route('/')
    .get(renderPublicHomePage);

publicRouter.route('/products/:id')
    .get(renderProductLandingPage);


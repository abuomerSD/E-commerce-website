import { Router } from "express";
import { renderPublicHomePage } from "../controllers/publicController";
export const publicRouter = Router();

publicRouter.route('/')
    .get(renderPublicHomePage);


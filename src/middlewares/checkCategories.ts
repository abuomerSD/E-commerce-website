import { NextFunction, Request, Response } from "express";
import { getAllCategories } from "../controllers/categoryController";

export async function checkCategories(req: Request, res: Response, next: NextFunction) {
    const categories = await getAllCategories();
    if (categories.length < 1) {
        res.locals.categories = null;
        next();
    } 
    else {
        next();
    }
}
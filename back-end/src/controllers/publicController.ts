import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllCategories } from "./categoryController";
import { getAllProducts } from "./productsController";


/**
 * render public Home Page
 */
export const renderPublicHomePage = asyncWrapper(async (req:Request, res: Response) => {
    const categories = await getAllCategories();
    const products = await getAllProducts();
    res.render('index', {title: 'Home', categories, products})
})

export const renderProductLandingPage = asyncWrapper(async (req: Request, res: Response) => {
    res.render('productLandingPage', {title:'test'});
})
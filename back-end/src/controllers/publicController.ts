import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllCategories } from "./categoryController";
import { getAllProducts } from "./productsController";
import { Category, Product } from "../databaseHandler/database";
import { title } from "process";


/**
 * render public Home Page
 */
export const renderPublicHomePage = asyncWrapper(async (req:Request, res: Response) => {
    const categories = await getAllCategories();
    const products = await getAllProducts();
    res.render('index', {title: 'Home', categories, products})
})

/**
 * render the product landing page
 */
export const renderProductLandingPage = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findOne({where: {id}});
    // render product landing page
    res.render('productLandingPage', {title:product?.name , product});
    
    // updating viewedTimes 
    if (product) {
       await product.increment('viewedTimes');
    }
    
});

/**
 * render catgeory landing page
 */
export const renderCategoryLandingPage = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findOne({where: {id}, include: {model: Product}});
    res.render('categoryLandingPage', { title: 'test' , category});
})
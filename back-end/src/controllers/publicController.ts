import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllCategories } from "./categoryController";
import { getAllProducts } from "./productsController";
import { Product } from "../databaseHandler/database";


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
    console.log('*'.repeat(20));
    // render product landing page
    res.render('productLandingPage', {title:product?.name , product});
    
    // updating viewedTimes 
    if (product) {
       await product.increment('viewedTimes');
    }
    
})
import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllCategories } from "./categoryController";
import { getAllProducts } from "./productsController";
import { Category, Product } from "../databaseHandler/database";
import sequelize from "sequelize";
import { BEST_SELLERS_LIMIT } from "../utils/contants";

const bestSellersLimit = BEST_SELLERS_LIMIT;

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
    res.render('categoryLandingPage', { title: category?.name , category});
});

/**
 * render best sellers page
 */
export const renderBestSellersPage = asyncWrapper(async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            [sequelize.fn('max', sequelize.col('saledTimes')), 'DESC']
        ],
        limit: bestSellersLimit,
        group: ['Product.id']
    });
    res.render('bestSellers', { title: 'Best Sellers', products });
});

export const renderNewReleasePage = asyncWrapper(async(req: Request, res: Response) => {
    const products = await Product.findAll({
        order: sequelize.col('createdAt'),
        group: ['Product.id'],
    })
    res.render('newReleases', { title: 'New Releases' ,products })
})
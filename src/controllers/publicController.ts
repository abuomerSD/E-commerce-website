import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllCategories } from "./categoryController";
import { getAllProducts, getFilteredProducts } from "./productsController";
import { CartDetails, CartHead, Category, Product, User } from "../databaseHandler/database";
import sequelize, { Op } from "sequelize";
import { BEST_SELLERS_LIMIT, MAX_AGE } from "../utils/contants";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const bestSellersLimit = BEST_SELLERS_LIMIT;
const jwtSecret: any = process.env.JWT_SECRECT;
const maxAge = MAX_AGE;

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
    const categories = await Category.findAll();
    // updating viewedTimes 
    if (product) {
       await product.increment('viewedTimes');
    }
    // render product landing page
    res.render('productLandingPage', {title:product?.name , product, categories});
});

/**
 * render catgeory landing page
 */
export const renderCategoryLandingPage = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await Category.findOne({where: {id}, include: {model: Product}});
    const categories = await Category.findAll();
    res.render('categoryLandingPage', { title: category?.name , category, categories});
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
    const categories = await Category.findAll();
    res.render('bestSellers', { title: 'Best Sellers', products , categories});
});

/**
 * render New Releases page
 */
export const renderNewReleasePage = asyncWrapper(async(req: Request, res: Response) => {
    const products = await Product.findAll({
        // order: sequelize.col('createdAt'),
        order: [['createdAt', 'DESC']],
        group: ['Product.id'],
    });
    const categories = await Category.findAll();
    res.render('newReleases', { title: 'New Releases' ,products , categories})
});

/**
 * renser public search product page when using navbar search group to find products
 */
export const renderPublicProductSearchPage = asyncWrapper(async (req: Request, res: Response) => {
    const { name } = req.body;
    const products =   await Product.findAll({where:{name: {
        [Op.iLike]: `%${name}%`,
    }}});
    const categories = await Category.findAll();
    const searchWords = name;
    res.render('publicSearchProduct', { title: 'Search for Products', products , categories ,searchWords })

});

export const renderLoginPage = asyncWrapper(async (req:Request, res: Response) => {
    const categories = await Category.findAll();
    res.render('login', { title: 'Login',  categories});
});

export const renderSignupPage = asyncWrapper(async (req:Request, res: Response) => {
    const categories = await Category.findAll();
    res.render('signup', { title: 'Sign Up',  categories});
    
})

export const renderCartPage = asyncWrapper(async (req: Request, res: Response) => {
    const categories = await getAllCategories();
    const {userId} = req.params;
    const cartHead = await CartHead.findOne({where: {userId}})
    let cartDetails;
    if (cartHead) {
        cartDetails = await CartDetails.findAll({where : {cartHeadId: cartHead?.id}})
    } else {
        cartDetails = null;
    }
    res.status(200).render('cart', {title: 'Cart', categories , cartDetails})    
})

export const getProductByIdAtPublicRoute = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findOne({where: {id}});
    res.status(200).json(product);
})






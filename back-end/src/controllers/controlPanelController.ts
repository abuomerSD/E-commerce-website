import { Request, Response } from "express";
import { getAllCategories } from "./categoryController";
import { Category } from "../databaseHandler/database";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllProducts, getLimitedByPaginationProducts } from "./productsController";


// getAllCategories().then(result => categories = result);

export const renderAdminHomePage = asyncWrapper(async (req: Request, res: Response) => {
    res.redirect('/admin/products');
})

export const renderProductsPage = asyncWrapper( async (req:Request, res: Response) => {
    // the default page is products page

    let categories: any = [];
    let products: any = [];
    let limitedProducts: any = [];

    let pageNumber : number = Number(req.query.pageNumber);
    let pageLimit : number = Number(req.query.pageLimit);

    if( Object.keys(req.query).length === 0 ) {
        pageNumber = 1;
        pageLimit = 5;
    }

    await getAllCategories().then(result => categories = result);

    await getAllProducts().then(result => products = result);

    // limited products by pagination to show in the page
    await getLimitedByPaginationProducts(req, pageNumber, pageLimit).then(result => limitedProducts = result);
    
    res.render('products',{categories, products, limitedProducts, pageNumber, pageLimit, title: 'Products'});
    
 }
);
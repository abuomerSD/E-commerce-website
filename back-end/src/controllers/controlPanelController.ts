import { Request, Response } from "express";
import { getAllCategories } from "./categoryController";
import { Category } from "../databaseHandler/database";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllProducts } from "./productsController";


// getAllCategories().then(result => categories = result);

export const renderProductsPage = asyncWrapper( async (req:Request, res: Response) => {
    // the default page is products page

    let categories: any = [];
    let products: any = [];

    await getAllCategories().then(result => {
        categories = result;
    }
    );

    await getAllProducts().then(result => {
        products = result;
    });
    
    res.render('products',{categories, products});
    
 }
)
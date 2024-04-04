import { Request, Response } from "express";
import { getAllCategories, getAllCategoriesLimitedByPageLimit } from "./categoryController";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { getAllProducts, getLimitedByPaginationProducts } from "./productsController";
import { Category, Product, SalesInvoiceHead, User } from "../databaseHandler/database";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "../utils/contants";
import { getAllUsers } from "./userController";

// to chane the page number and products limit change this two values

const defaultPageNumber = DEFAULT_PAGE_NUMBER;
const defaultPageLimit = DEFAULT_PAGE_LIMIT ;

export const renderAdminHomePage = asyncWrapper(async (req: Request, res: Response) => {
    res.redirect('/admin/products');
});

export const renderProductsPage = asyncWrapper( async (req:Request, res: Response) => {
    // the default page is products page

    let categories: any = [];
    let products: any = [];
    let limitedProducts: any = [];

    let pageNumber : number = Number(req.query.pageNumber);
    let pageLimit : number = Number(req.query.pageLimit);

    if( Object.keys(req.query).length === 0 ) {
        pageNumber = defaultPageNumber;
        pageLimit = defaultPageLimit;
    }

    await getAllCategories().then(result => categories = result);

    await getAllProducts().then(result => products = result);

    // limited products by pagination to show in the page
    await getLimitedByPaginationProducts(req, pageNumber, pageLimit).then(result => limitedProducts = result);
    
    res.render('cpProducts',{categories, products, limitedProducts, pageNumber, pageLimit, title: 'Products'});
    
 }
);

export const renderCategoriesPage = asyncWrapper(async (req: Request, res: Response) => {
    let categories: Array<Category> = [];
    let limitedCategories : Array<Category> = [];

    let pageNumber : number = Number(req.query.pageNumber);
    let pageLimit : number = Number(req.query.pageLimit);

    if( Object.keys(req.query).length === 0 ) {
        pageNumber = defaultPageNumber;
        pageLimit = defaultPageLimit;
    }
    

    await getAllCategories().then(result => categories = result);
    
    await getAllCategoriesLimitedByPageLimit(pageNumber).then(result => limitedCategories = result);
    
    res.render('cpCategories',{title: 'Categories', categories, limitedCategories, pageLimit, pageNumber});


});

/**
 * render sales invoices page
 */
export const renderSalesInvoicesPage = asyncWrapper(async (req: Request, res: Response) => {
    const categories = await getAllCategories();
    const users = await User.findAll();
    const salesInvoicesHeads = await SalesInvoiceHead.findAll();
    res.status(200).render('cpSalesInvoices', {title: 'Sales Invoices', categories, users , salesInvoicesHeads})
});

/**
 * render  purchase invoices page
 */

export const renderPurchaseInvoicesPage = asyncWrapper(async (req:Request, res: Response) => {
    res.status(200).render('cpPurchaseInvoices', { title: 'Purchase Invoices' })
});

/**
 * render  Users Control page
 */

export const renderUsersPage = asyncWrapper(async (req:Request, res: Response) => {
    res.status(200).render('cpUsers', { title: 'Users' })
});

/**
 * render  Dashboard page
 */

export const renderDashboardPage = asyncWrapper(async (req:Request, res: Response) => {
    res.status(200).render('cpDashboard', { title: 'Dashboard' })
});


/**
 * render  add purchase invoice page
 */

export const renderAddPurchaseInvoicePage = asyncWrapper(async (req:Request, res: Response) => {
    const products = await Product.findAll();
    res.status(200).render('cpAddPurchaseInvoice', { title: 'New Purchase Invoice' , products});
});


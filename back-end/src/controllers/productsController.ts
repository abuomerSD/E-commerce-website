import {Request, Response} from 'express';
import {Category, Product} from '../databaseHandler/database';
import {asyncWrapper} from '../middlewares/asyncWrapper';
import fs from 'fs';
import { httpStatus } from '../utils/httpStatusCodesStates';
import { getAllCategories } from './categoryController';

// this interface is only to reperesnt the updatable attributes of Type Product
interface ProductType {
    // categoryId: string,
    name: string,
    quantity: number,
    cost: number,
    price: number,
    image?: string,
    saledTimes: bigint,
    viewedTimes: bigint,
}
// save product
export const saveProduct = asyncWrapper(async (req:Request, res: Response) => {
    const {name, category_name, quantity, cost, price} = req.body;
    const image = req.file?.filename;    

    // to get the categoryId from given Category name
    let categories: Array<any> = [];
    let categoryId: string = '';
    await getAllCategories().then(result => categories = result);
    categories.forEach(category => {
        if(category_name === category.name) {
            categoryId = category.id;
        }
    })
    
    await Product.create({name, categoryId, quantity, cost, price, image}).then((product)=> {
        res.status(201).redirect('/admin/products');
        // res.status(201).json({
        //     status: httpStatus.SUCCESS,
        //     data: product,
        // });
        
    });
});

// get all products as array 
export const getAllProducts = async() => {
    let products: any = [];
    await Product.findAll().then((result)=> {
        products = result;
        // res.status(200).json({
        //     status: httpStatus.SUCCESS,
        //     data: products,
        // });
    });
    return products;
}

// get filtered products using the search input
const getFilteredProducts = async (req: Request) => {
    let products : Array<Product> = [];
    const {product_name_search_input} = req.body
    const name: string = product_name_search_input;
    // console.log(productName);
    
    await Product.findAll({where:{name}}).then(result => products = result);
    return products;
}
// get limited products for the pagination
export const getLimitedByPaginationProducts = async (req: Request, pageNumber: number, pageLimit: number) => {
    

    let products: Array<Product> = [];

    await Product.findAll({limit: pageLimit, offset: (pageNumber - 1) * pageLimit}) 
        .then(result => products = result);
    return products;
}

export const renderProductsPageWithFilteredProducts = asyncWrapper(async (req:Request, res:Response) => {
    const products : Array<Product> = await getFilteredProducts(req);
    let categories: Array<Category> = [];
    await getAllCategories().then(result => categories =result);
    
    res.render('products', {products ,categories, title: 'Products'});
})

// get single product by id
export const getProductById = asyncWrapper(async(req: Request, res: Response) => {
    const {id} = req.params;
    await Product.findOne({where: {id}}).then(product => res.status(200).json({
        status: httpStatus.SUCCESS,
        data: product,
    }));
});

// update single product using the id
export const updateProductById = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    const newProduct: ProductType = req.body;
    newProduct.image = req.file?.filename;
    let oldProduct: any = await Product.findOne({where: {id}});
    
    // deleting the old image from harddisk to save some space
    await fs.unlink(`uploads/products-images/${oldProduct.image}`, (err)=> {
        if (err) res.status(400).json({status: 'fail', data: err.message})  
    });

    oldProduct.set(newProduct);
    await oldProduct?.save().then((product: any) => res.status(200).json({
        status: httpStatus.SUCCESS,
        data: product,
    }));
});


// categoryid not updating


export const delelteProduct = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    let oldProduct : any ;
    oldProduct = await Product.findOne({where: {id}});

    // deleting the old image from harddisk to save some space
    await fs.unlink(`uploads/products-images/${oldProduct.image}`, (err)=> {
        if (err) res.status(400).json({status: 'fail', data: err.message})  
    });

    await Product.destroy({where: {id}}).then(rows => {
        res.status(200).end();
    })
        // res.status(200).redirect('/admin/products'));
});
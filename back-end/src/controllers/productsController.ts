import {Request, Response} from 'express';
import {Product} from '../databaseHandler/database';
import {asyncWrapper} from '../middlewares/asyncWrapper';
import fs from 'fs';
import { Model } from 'sequelize';
import { ifError } from 'assert';

// this interface is only to reperesnt the updatable attributes of Type Product
interface ProductType {
    categoryId: string,
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
    const {name, categoryId, quantity, cost, price} = req.body;
    const image = req.file?.filename;
    
    await Product.create({name, categoryId, quantity, cost, price, image}).then((product)=> {
        res.status(201).json(product);
        
    });
});

// get all products as json 
export const getAllProducts = asyncWrapper(async(req: Request, res: Response) => {
    await Product.findAll().then((products)=> {
        res.status(200).json(products);
    });     
});

// get single product by id
export const getProductById = asyncWrapper(async(req: Request, res: Response) => {
    const {id} = req.params;
    await Product.findOne({where: {id}}).then(product => res.status(200).json(product));
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
    await oldProduct?.save().then((product: any) => res.status(201).json(product));

});


// categoryid not updating
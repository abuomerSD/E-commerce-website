import {Request, Response} from 'express';
import {Product} from '../databaseHandler/database';
import {asyncWrapper} from '../middlewares/asyncWrapper'

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
    const {name, categoryid ,qty, cost, price, saledTimes, viewedTimes} = req.body;
    const image = req.file?.filename;
    let product = await Product.findOne({where: {id}});
    // console.log(product);
    res.json(product);
    const newProduct = {name, categoryid ,qty, cost, price, saledTimes, viewedTimes};
    
})
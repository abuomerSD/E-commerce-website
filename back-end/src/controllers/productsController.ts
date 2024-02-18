import {Request, Response} from 'express';
import {Product} from '../databaseHandler/database';
import {asyncWrapper} from '../middlewares/asyncWrapper'

export const saveProduct = asyncWrapper(async (req:Request, res: Response) => {
    const {name, quantity, cost, price, image} = req.body;
    console.log(req.file);

    await Product.create({name, quantity, cost, price, image}).then((product)=> {
        console.log(req.file);
        console.log(req);
        res.json(product);
        
    });
})
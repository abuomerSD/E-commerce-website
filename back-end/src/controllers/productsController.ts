import {Request, Response} from 'express';
import {Product} from '../databaseHandler/database';
import {asyncWrapper} from '../middlewares/asyncWrapper'

export const saveProduct = asyncWrapper(async (req:Request, res: Response) => {
    const {productName, quantity, cost, price, image} = req.body;

    await Product.create({
        productName: productName,
        quantity: quantity,
        cost: cost,
        price: price,
        image: image,
    }).then((product)=> {
        res.json(product);
    })
})
import {Router} from 'express';
export const adminRouter = Router();

const productsArray = [
    {
        name: 'product 1',
        price: 1000
    },
    {
        name: 'product 2',
        price: 2000
    },
    {
        name: 'product 3',
        price: 3000
    }
]

adminRouter.route('/products').get((req, res)=> {
    res.json(productsArray);
})
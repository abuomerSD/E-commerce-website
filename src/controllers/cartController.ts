import { CartDetails, CartHead } from "../databaseHandler/database";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { Request, Response } from "express";

export const getCartByUserId = asyncWrapper(async (req: Request, res: Response) => {
    const {userId} = req.params;
    const cart = await CartHead.findOne({where: {userId}, include: {
        model: CartDetails,
    }});
    res.status(200).json(cart);
})

export const saveCartItem = asyncWrapper(async (req:Request, res: Response) => {
    const {userId} = req.params;
    const product = req.body;
    let cartHead : any = {
        total: 0, 
        userId
    }
    const savedCartHead = await CartHead.create(cartHead);
    let cartDetails : any = {
        productId: product.id,
        productName: product.name,
        productQty: 1,
        productPrice: product.price,
        productTotal: product.price,
        cartHeadId: savedCartHead.id,
    }
    
    await CartDetails.create(cartDetails);
    res.status(201).end();
})
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
    let headId;
    let cartHead : any = {
        total: 0, 
        userId
    }
    const checkCartHead = await CartHead.findOne({where: {userId}});

    if (checkCartHead) {
        headId = checkCartHead.id;
    }
    else {
        const savedCartHead = await CartHead.create(cartHead);
        headId = savedCartHead?.id;
    }
    let cartDetails : any = {
        productId: product.id,
        productName: product.name,
        productQty: 1,
        productPrice: product.price,
        productTotal: product.price,
        cartHeadId: headId,
    }
    
    await CartDetails.create(cartDetails);
    res.status(201).end();
})

export const deleteItemFromCart = asyncWrapper(async (req:Request, res: Response) => {
    const {productId} = req.body;

    const headId = (await CartDetails.findOne({where: {productId}})).cartHeadId;
    const cartDetails = await CartDetails.findAll({where: {cartHeadId: headId}});
    
    // deleting the cart detail item
    await CartDetails.destroy({where: {productId}});
    console.log('length: ', cartDetails.length);
    
    // deleting cart head if the cart only contain one element
    if (cartDetails.length === 1) {
        await CartHead.destroy({where: {id: headId}})
    }
    res.status(200).end();
})


/**
 * update cart item qty and total
 */

export const updateCartItem = asyncWrapper(async (req:Request, res: Response) => {
    const { productId } = req.params;
    const cartItem = await CartDetails.findOne({where : {productId}});
    const newCartItem = req.body;
    console.log('new cart body', newCartItem);
    
    cartItem?.set(newCartItem);
    cartItem?.save();
    res.status(200).end();
})
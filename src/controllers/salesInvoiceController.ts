import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { CartDetails, CartHead, Product, SalesInvoiceDetails, SalesInvoiceHead, salesInvoiceDetailsRelationship } from "../databaseHandler/database";

/**
 * save sales invoice in the database
 */
export const saveSalesInvoice = asyncWrapper(async (req:Request, res: Response) => {
    const cart = req.body;
    console.log(cart);
    
    // saving sales invoice head
    const userId = cart.userId;
    let total = 0

    cart.CartDetails.forEach((item: { productTotal: number; }) => {
        total += item.productTotal;
    });

    let salesInvoiceDetails: any[] = [];
    cart.CartDetails.forEach((item: any) => {
        salesInvoiceDetails.push(item);
    });

    const salesInvoiceHead = await SalesInvoiceHead.create({
        userId,
        total,
        salesInvoiceDetails,
    }, {
        include: [salesInvoiceDetailsRelationship]
    });

    // decrement product qty from the database
    salesInvoiceDetails.forEach(async (element) => {
        const product = await Product.findOne({where: {id: element.productId}});
        product.quantity = product.quantity - element.productQty;
        product.saledTimes += 1;
        await product?.save();
    })

    // removing cart items from the database
    CartHead.destroy({where: {id: cart.id}});
    cart.CartDetails.forEach((element: { productId: any; }) => {
        CartDetails.destroy({where: {productId: element.productId}});
    });

    res.status(201).end();
})

async function updateProductQty(productId:string) {
    
}
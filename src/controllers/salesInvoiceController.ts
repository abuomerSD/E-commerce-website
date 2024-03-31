import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { SalesInvoiceDetails, SalesInvoiceHead, salesInvoiceDetailsRelationship } from "../databaseHandler/database";

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
    console.log('sales invoice head', salesInvoiceHead);
    
    // saving sales invoice details


    // decrement product qty from the database

    // removing cart items from the database
    res.status(201).end();
})

async function updateProductQty(productId:string) {
    
}
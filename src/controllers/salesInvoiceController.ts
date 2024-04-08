import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { CartDetails, CartHead, Product, SalesInvoiceDetails, SalesInvoiceHead, User, salesInvoiceDetailsRelationship } from "../databaseHandler/database";
import { title } from "process";

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


/**
 * renderShowSalesInvoice
 */

export const renderShowSalesInvoice = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const salesInvoicesHead = await SalesInvoiceHead.findOne({where: {id}});
    const salesInvoiceDetails = await SalesInvoiceDetails.findAll({where: {salesInvoiceHeadId: id}});
    const user = await User.findOne({where: { id: salesInvoicesHead.userId }})
    res.status(200).render('cpShowSalesInvoice', { title: `Sales Invoice No: ${id}` , salesInvoicesHead , salesInvoiceDetails, user});
});
import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { Product, PurchaseInvoiceDetails, PurchaseInvoiceHead } from "../databaseHandler/database";


/**
 * save Purchase Invoice
 */

export const savePurchaseInvoice = asyncWrapper(async (req:Request, res: Response) => {
    // console.log(req.body);
    const head = {
        supplierName: req.body.supplierName,
        total: req.body.total,
    }
    const products: any[] = req.body.products;

    // saving invoice head to the database
    const purchaseInvoiceHead = await PurchaseInvoiceHead.create(head);
    const invoiceId = purchaseInvoiceHead.id;

    // saving invoice details to the database
    products.forEach(async product => {
        const oldProduct = await Product.findOne({where: {name: product.productName}});

        // calculating the new cost
        const averageCost = getAverageProductCost(oldProduct, product);
        console.log('averageCost', averageCost);
        

        // updating the product cost and quantity
        const newProduct = {
            quantity: oldProduct.quantity + product.productQuantity,
            cost: averageCost,
        }

        // console.log('newProduct', newProduct);
        oldProduct.set(newProduct);
        await oldProduct.save();

        // inserting product to purchase invoice details
        product.purchaseInvoiceHeadId = invoiceId;
        const purchaseInvoiceDetail = await PurchaseInvoiceDetails.create(product);
        // console.log('purchaseInvoiceDetail', purchaseInvoiceDetail);
        
    })

    res.status(201).end();
});

function getAverageProductCost(oldProduct: any, newProduct: any) {
    const oldCost = +oldProduct.cost;
    const oldQuantity = +oldProduct.quantity;
    const newCost = +newProduct.productCost;
    const newQuantity = +newProduct.productQuantity;

    const averageCost = ((oldCost * oldQuantity) + (newCost * newQuantity)) / (oldQuantity + newQuantity);

    return averageCost;
}

export const renderShowPurchaseInvoice = asyncWrapper
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderShowPurchaseInvoice = exports.savePurchaseInvoice = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const database_1 = require("../databaseHandler/database");
/**
 * save Purchase Invoice
 */
exports.savePurchaseInvoice = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const head = {
        supplierName: req.body.supplierName,
        total: req.body.total,
    };
    const products = req.body.products;
    // saving invoice head to the database
    const purchaseInvoiceHead = yield database_1.PurchaseInvoiceHead.create(head);
    const invoiceId = purchaseInvoiceHead.id;
    // saving invoice details to the database
    products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        const oldProduct = yield database_1.Product.findOne({ where: { name: product.productName } });
        // calculating the new cost
        const averageCost = getAverageProductCost(oldProduct, product);
        console.log('averageCost', averageCost);
        // updating the product cost and quantity
        const newProduct = {
            quantity: oldProduct.quantity + product.productQuantity,
            cost: averageCost,
        };
        // console.log('newProduct', newProduct);
        oldProduct.set(newProduct);
        yield oldProduct.save();
        // inserting product to purchase invoice details
        product.purchaseInvoiceHeadId = invoiceId;
        const purchaseInvoiceDetail = yield database_1.PurchaseInvoiceDetails.create(product);
        // console.log('purchaseInvoiceDetail', purchaseInvoiceDetail);
    }));
    res.status(201).end();
}));
function getAverageProductCost(oldProduct, newProduct) {
    const oldCost = +oldProduct.cost;
    const oldQuantity = +oldProduct.quantity;
    const newCost = +newProduct.productCost;
    const newQuantity = +newProduct.productQuantity;
    const averageCost = ((oldCost * oldQuantity) + (newCost * newQuantity)) / (oldQuantity + newQuantity);
    return averageCost;
}
exports.renderShowPurchaseInvoice = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const purchaseInvoiceHead = yield database_1.PurchaseInvoiceHead.findOne({ where: { id } });
    const purchaseInvoiceDetails = yield database_1.PurchaseInvoiceDetails.findAll({ where: { purchaseInvoiceHeadId: id } });
    res.status(200).render('cpShowPurchaseInvoice', { title: `Purchase Invoice No: ${id}`, purchaseInvoiceHead, purchaseInvoiceDetails });
}));

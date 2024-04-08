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
exports.renderShowSalesInvoice = exports.saveSalesInvoice = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const database_1 = require("../databaseHandler/database");
/**
 * save sales invoice in the database
 */
exports.saveSalesInvoice = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = req.body;
    console.log(cart);
    // saving sales invoice head
    const userId = cart.userId;
    let total = 0;
    cart.CartDetails.forEach((item) => {
        total += item.productTotal;
    });
    let salesInvoiceDetails = [];
    cart.CartDetails.forEach((item) => {
        salesInvoiceDetails.push(item);
    });
    const salesInvoiceHead = yield database_1.SalesInvoiceHead.create({
        userId,
        total,
        salesInvoiceDetails,
    }, {
        include: [database_1.salesInvoiceDetailsRelationship]
    });
    // decrement product qty from the database
    salesInvoiceDetails.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield database_1.Product.findOne({ where: { id: element.productId } });
        product.quantity = product.quantity - element.productQty;
        product.saledTimes += 1;
        yield (product === null || product === void 0 ? void 0 : product.save());
    }));
    // removing cart items from the database
    database_1.CartHead.destroy({ where: { id: cart.id } });
    cart.CartDetails.forEach((element) => {
        database_1.CartDetails.destroy({ where: { productId: element.productId } });
    });
    res.status(201).end();
}));
/**
 * renderShowSalesInvoice
 */
exports.renderShowSalesInvoice = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const salesInvoicesHead = yield database_1.SalesInvoiceHead.findOne({ where: { id } });
    const salesInvoiceDetails = yield database_1.SalesInvoiceDetails.findAll({ where: { salesInvoiceHeadId: id } });
    const user = yield database_1.User.findOne({ where: { id: salesInvoicesHead.userId } });
    res.status(200).render('cpShowSalesInvoice', { title: `Sales Invoice No: ${id}`, salesInvoicesHead, salesInvoiceDetails, user });
}));

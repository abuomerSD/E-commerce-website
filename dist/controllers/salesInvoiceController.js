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
exports.saveSalesInvoice = void 0;
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
        include: database_1.SalesInvoiceDetails,
        as: 'salesInvoiceDetails'
    });
    console.log('sales invoice head', salesInvoiceHead);
    // saving sales invoice details
    // decrement product qty from the database
    // removing cart items from the database
    res.status(201).end();
}));
function updateProductQty(productId) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}

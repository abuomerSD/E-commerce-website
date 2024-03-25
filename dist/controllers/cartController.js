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
exports.saveCartItem = exports.getCartByUserId = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
exports.getCartByUserId = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const cart = yield database_1.CartHead.findOne({ where: { userId }, include: {
            model: database_1.CartDetails,
        } });
    res.status(200).json(cart);
}));
exports.saveCartItem = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const product = req.body;
    let headId;
    let cartHead = {
        total: 0,
        userId
    };
    const checkCartHead = yield database_1.CartHead.findOne({ where: { userId } });
    if (checkCartHead) {
        headId = checkCartHead.id;
    }
    else {
        const savedCartHead = yield database_1.CartHead.create(cartHead);
        headId = savedCartHead === null || savedCartHead === void 0 ? void 0 : savedCartHead.id;
    }
    let cartDetails = {
        productId: product.id,
        productName: product.name,
        productQty: 1,
        productPrice: product.price,
        productTotal: product.price,
        cartHeadId: headId,
    };
    yield database_1.CartDetails.create(cartDetails);
    res.status(201).end();
}));

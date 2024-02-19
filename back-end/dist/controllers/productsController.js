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
exports.updateProductById = exports.getProductById = exports.getAllProducts = exports.saveProduct = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
// save product
exports.saveProduct = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, categoryId, quantity, cost, price } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    yield database_1.Product.create({ name, categoryId, quantity, cost, price, image }).then((product) => {
        res.status(201).json(product);
    });
}));
// get all products as json 
exports.getAllProducts = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.Product.findAll().then((products) => {
        res.status(200).json(products);
    });
}));
// get single product by id
exports.getProductById = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.Product.findOne({ where: { id } }).then(product => res.status(200).json(product));
}));
// update single product using the id
exports.updateProductById = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const { name, categoryid, qty, cost, price, saledTimes, viewedTimes } = req.body;
    const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
    let product = yield database_1.Product.findOne({ where: { id } });
    // console.log(product);
    res.json(product);
    const newProduct = { name, categoryid, qty, cost, price, saledTimes, viewedTimes };
}));

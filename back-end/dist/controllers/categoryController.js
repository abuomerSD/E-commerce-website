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
exports.saveCategory = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const httpStatusCodesStates_1 = require("../utils/httpStatusCodesStates");
exports.saveCategory = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    yield database_1.Category.create({ name }).then((category) => {
        res.status(201).json({
            status: httpStatusCodesStates_1.httpStatus.SUCCESS,
            data: category,
        });
    });
}));

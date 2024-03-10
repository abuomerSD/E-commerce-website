"use strict";
/**
 * this module is created for handling user database crud
 *
 */
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
exports.getAllUsers = exports.saveUser = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const database_1 = require("../databaseHandler/database");
/**
 * save user
 *
 */
exports.saveUser = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const userCreated = yield database_1.User.create(user);
    res.json(userCreated);
}));
/**
 * get all users array as json
 */
exports.getAllUsers = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.User.findAll();
    res.status(200).json(users);
}));

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
exports.isAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const database_1 = require("../databaseHandler/database");
(0, dotenv_1.config)({ path: '../../.env' });
const jwtSecret = process.env.JWT_SECRET;
function isAdmin(req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        (0, jsonwebtoken_1.verify)(token, jwtSecret, (err, decodedToken) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw new Error(err);
                res.locals.user = null;
                next();
            }
            else {
                const user = yield database_1.User.findOne({ where: { id: decodedToken.id } });
                res.locals.user = user;
                if (user.role === 'admin') {
                    next();
                }
                else {
                    // throw new Error('This Route is only for Admins');
                    res.send('This Route is only for Admins');
                }
            }
        }));
    }
    else {
        res.locals.user = null;
        // throw new Error("Please Login First");
        res.send("Please Login First");
    }
}
exports.isAdmin = isAdmin;

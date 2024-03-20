"use strict";
/**
 * this module is created for handling user database crud
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateUser = exports.renderPasswordResetPage = exports.sendPasswordResetConfirmationEmail = exports.renderEnterYouEmailPage = exports.logout = exports.login = exports.activateUser = exports.renderUserConfirmatoinPage = exports.getAllUsers = exports.saveUser = void 0;
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const database_1 = require("../databaseHandler/database");
const bcrypt = __importStar(require("bcrypt"));
const validator_1 = require("validator");
const mailSender = __importStar(require("../utils/mailSender"));
const contants_1 = require("../utils/contants");
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
const categoryController_1 = require("./categoryController");
const bcrypt_1 = require("bcrypt");
let flash = require('connect-flash');
dotenv.config({ path: '../../.env' });
const websiteName = contants_1.WEBSITE_NAME;
const myEmail = process.env.EMAIL;
const jwtSecret = process.env.JWT_SECRET;
const maxAge = contants_1.MAX_AGE;
/**
 * save user
 *
 */
exports.saveUser = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // validate the user input
    if ((0, validator_1.isEmpty)(user.firstName) || (0, validator_1.isEmpty)(user.lastName) || !(0, validator_1.isEmail)(user.email) || (0, validator_1.isEmpty)(user.username) || (0, validator_1.isEmpty)(user.password)) {
        throw new Error('User Validation Error');
    }
    else {
        // hashing user's password and saving the user
        const hashedPassword = yield bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const userCreated = yield database_1.User.create(user);
        res.status(201).end();
        // sending confirmation email to user
        let link = `${req.headers.host}/shop/signup/confirmation/${userCreated.id}`;
        // console.log('confirmation link', link);
        let confirmationPageHtml = `
         <h1>Step Shopping</h1>
         <h2>Account Activation</h2>
         <h3>Click this Link to Activate your account</h3>
         <a href= ${link} style="color: white; background: blue">Activate</a>
         <h5>Confirmation Link:</h5>
         <p>${link}</p>
      `;
        yield mailSender.send({
            name: websiteName,
            address: myEmail
        }, user.email, 'Please Activate your Account', 'Account Activation', confirmationPageHtml);
    }
}));
/**
 * get all users array as json
 */
exports.getAllUsers = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.User.findAll();
    res.status(200).json(users);
}));
/**
 * renderUserConfirmatoinPage
 */
exports.renderUserConfirmatoinPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield database_1.Category.findAll();
    res.render('confirm', { title: 'User Confirmation', categories });
}));
/**
 * activate user when click on confirmation link and render the  home page
 */
// const maxAge = 1 * 24 * 60 * 60; // 1 day in seconds
exports.activateUser = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield database_1.User.findOne({ where: { id: userId } });
    if (user) {
        user.isActive = true;
        yield user.save();
        const token = createToken(user);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 1 day in msec
        });
        // res.locals.user = user;
        const categories = yield (0, categoryController_1.getAllCategories)();
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
}));
function createToken(user) {
    const token = (0, jsonwebtoken_1.sign)({ id: user.id, username: user.username, role: user.role }, jwtSecret, {
        expiresIn: maxAge,
    });
    return token;
}
exports.login = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // finding the user on the database
    let user = yield database_1.User.findOne({ where: { username } });
    if (!user) {
        user = yield database_1.User.findOne({ where: { email: username } });
    }
    if (!user) {
        res.status(404).send('user not found');
        // res.flash('success', 'Registration successfully');
        // res.locals.message = req.flash();
    }
    if (user) {
        // comparing the entered password with the hashed password on the database
        const result = yield (0, bcrypt_1.compare)(password, user.password);
        if (result) {
            // creating jwt token 
            const token = (0, jsonwebtoken_1.sign)({ id: user.id }, jwtSecret, {
                expiresIn: maxAge,
            });
            res.cookie('jwt', token, {
                maxAge: maxAge * 1000,
                httpOnly: true,
            });
            res.status(200).redirect('/');
        }
        else {
            res.status(400).send('password is not correct');
        }
    }
}));
exports.logout = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // removing jwt token from browser
    res.cookie('jwt', '');
    // redirecting to index page
    res.redirect('/');
}));
exports.renderEnterYouEmailPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    res.status(200).render('enterYourEmail', { title: 'Password Reset', categories });
}));
exports.sendPasswordResetConfirmationEmail = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    const { email } = req.body;
    const user = yield database_1.User.findOne({ where: { email } });
    const link = `${req.headers.host}/shop/users/password-reset/${user.id}`;
    let confirmationPageHtml = `
   <h1>Step Shopping</h1>
   <h2>Password Reset</h2>
   <h3>Click this Link to Change your Password</h3>
   <a href= ${link} style="color: white; background: blue">Activate</a>
   <h5>Confirmation Link:</h5>
   <p>${link}</p>
`;
    yield mailSender.send({
        name: websiteName,
        address: myEmail
    }, user.email, 'Please Reset Your Password', 'Password Reset', confirmationPageHtml);
    res.status(200).end();
    // res.status(200).render('passwordResetEmailConfirmation', { title: 'Password Reset', categories })
}));
exports.renderPasswordResetPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    const { userId } = req.params;
    res.status(200).render('passwordReset', { title: 'Password Reset', categories, userId });
}));
exports.updateUser = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const newUser = req.body;
    // hash user password
    const hashedPassword = yield bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    // fetch old user 
    const user = yield database_1.User.findOne({ where: { id } });
    user === null || user === void 0 ? void 0 : user.set(newUser);
    yield (user === null || user === void 0 ? void 0 : user.save());
    res.status(200).end();
}));

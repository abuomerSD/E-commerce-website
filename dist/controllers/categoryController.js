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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.renderSearchCategoryPage = exports.getAllCategoriesLimitedByPageLimit = exports.getAllCategories = exports.saveCategory = void 0;
const database_1 = require("../databaseHandler/database");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const httpStatusCodesStates_1 = require("../utils/httpStatusCodesStates");
const contants_1 = require("../utils/contants");
const sequelize_1 = require("sequelize");
const database_2 = require("../databaseHandler/database");
const pageLimit = contants_1.DEFAULT_PAGE_LIMIT;
// to save category to database
/**
 * to save category to the database
 */
exports.saveCategory = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    yield database_1.Category.create({ name }).then((category) => {
        res.status(201).redirect('/admin/categories');
    });
}));
// to get all categories 
/**
 *
 * @returns  All Categories Array
 */
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        let categories = [];
        yield database_1.Category.findAll({ include: { model: database_2.Product } }).then(result => {
            categories = result;
        });
        return categories;
    });
}
exports.getAllCategories = getAllCategories;
// to get limited by pagination categories
function getAllCategoriesLimitedByPageLimit(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let categories = [];
        let offset = (pageNumber - 1) * pageLimit;
        yield database_1.Category.findAll({ limit: pageLimit, offset }).then(result => categories = result);
        return categories;
    });
}
exports.getAllCategoriesLimitedByPageLimit = getAllCategoriesLimitedByPageLimit;
// render search category page 
exports.renderSearchCategoryPage = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    let limitedCategories = [];
    yield database_1.Category.findAll({ where: { name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            } } }).then(result => limitedCategories = result);
    res.render('cpSearchCategory', { title: 'Search Category', name, limitedCategories });
}));
// export const getAllCategories = asyncWrapper(async (req?: Request, res?: Response) => {
//     await Category.findAll().then((categories) => {
//         return categories;
//         // res.status(200).json({
//         //     status: httpStatus.SUCCESS,
//         //     data: categories,
//         // })
//     });
// } );
exports.getCategoryById = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.Category.findOne({ where: { id } }).then(category => res.status(200).json({
        status: httpStatusCodesStates_1.httpStatus.SUCCESS,
        data: category,
    }));
}));
exports.updateCategory = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let oldCategory = yield database_1.Category.findOne({ where: { id } });
    const newCategory = req.body;
    oldCategory === null || oldCategory === void 0 ? void 0 : oldCategory.set(newCategory);
    yield (oldCategory === null || oldCategory === void 0 ? void 0 : oldCategory.save().then(category => res.status(200).json({
        status: httpStatusCodesStates_1.httpStatus.SUCCESS,
        data: category
    })));
}));
exports.deleteCategory = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.Category.destroy({ where: { id } }).then(num => res.status(200).json({
        status: httpStatusCodesStates_1.httpStatus.SUCCESS,
        data: `${num} category deleted`
    }));
}));

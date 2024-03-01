import { Request, Response } from "express";
import { Category } from "../databaseHandler/database" ;
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { httpStatus } from "../utils/httpStatusCodesStates";
import { DEFAULT_PAGE_LIMIT } from "../utils/contants";

const pageLimit = DEFAULT_PAGE_LIMIT;


// to save category to database
export const saveCategory = asyncWrapper(async (req: Request, res: Response)=> {
    const { name } = req.body;
    await Category.create({name}).then((category) => {
        res.status(201).redirect('/admin/categories');
    });
});

// to get all categories 
export async function getAllCategories() {
    let categories:any;
    await Category.findAll().then(result => {
        categories = result;
    })
    return categories;
}

// to get limited by pagination categories

export async function getAllCategoriesLimitedByPageLimit(pageNumber: number) {
    let categories: Array<Category>  =[];
    let offset = (pageNumber -1) * pageLimit
    await Category.findAll({ limit: pageLimit, offset }).then(result => categories = result);
    return categories;
}

// export const getAllCategories = asyncWrapper(async (req?: Request, res?: Response) => {
//     await Category.findAll().then((categories) => {
//         return categories;
//         // res.status(200).json({
//         //     status: httpStatus.SUCCESS,
//         //     data: categories,
//         // })
//     });
// } );

export const getCategoryById = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    await Category.findOne({where:{id}}).then(category => res.status(200).json({
        status: httpStatus.SUCCESS,
        data: category,
    }));
});

export const updateCategory = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    let oldCategory = await Category.findOne({where: {id}});
    const newCategory = req.body;
    oldCategory?.set(newCategory);
    await oldCategory?.save().then(category => res.status(200).json({
        status: httpStatus.SUCCESS,
        data: category
    }));
});

export const deleteCategory = asyncWrapper(async (req: Request, res: Response) => {
    const {id} = req.params;
    await Category.destroy({where: {id}}).then(num => res.status(200).json({
        status: httpStatus.SUCCESS,
        data: `${num} category deleted`
    }));
});
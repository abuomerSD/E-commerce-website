import { Request, Response } from "express";
import { Category } from "../databaseHandler/database" ;
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { httpStatus } from "../utils/httpStatusCodesStates";

export const saveCategory = asyncWrapper(async (req: Request, res: Response)=> {
    const { name } = req.body;
    await Category.create({name}).then((category) => {
        res.status(201).json({
            status: httpStatus.SUCCESS,
            data: category,
        });
    });
});


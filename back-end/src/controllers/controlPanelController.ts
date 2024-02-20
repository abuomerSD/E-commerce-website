import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";

export const renderControlPanelPage = asyncWrapper(async (req:Request, res: Response) => {
    res.render('');
})
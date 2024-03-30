import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";

/**
 * save sales invoice header and footer
 */
export const saveSalesInvoice = asyncWrapper(async (req:Request , res: Response) => {
    
})
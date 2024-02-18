import { Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: Function) => {   
    
        res.status(500).json({  
            status: "error",
            message: error.message
        });
    
}
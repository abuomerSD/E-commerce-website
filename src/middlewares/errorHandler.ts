import { Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: Function) => {   
    
    const categories: any = [];
    console.log(error);
    
    res.status(400).render('Error', {error : error, title: 'Error', categories});
    
}
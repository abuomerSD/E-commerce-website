import { NextFunction, Request, Response } from "express";

export function isUser(req: Request, res: Response, next: NextFunction) {
    if(res.locals.user) {
        next();
    }
    else{
        res.locals.user = null;
        next();
    }
}
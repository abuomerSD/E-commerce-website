import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import {config} from 'dotenv';
import { User } from "../databaseHandler/database";
config({path:'../../.env'});

const jwtSecret: any = process.env.JWT_SECRET

export function isUser(req: Request, res: Response, next: NextFunction) {

    const token: string | null = req.cookies.jwt;
    if (token) {
        verify(token, jwtSecret, async (err: any, decodedToken: any) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findOne({where: {id: decodedToken.id}})
                res.locals.user = user;
                next()
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
    // if (req.cookies.jwt) {
        
    // }
    // else {
    //     next();
    // }

}
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import {config} from 'dotenv';
import { User } from "../databaseHandler/database";
config({path:'../../.env'});

const jwtSecret: any = process.env.JWT_SECRET

export function isAdmin(req: Request, res: Response, next: NextFunction) {

    const token: string | null = req.cookies.jwt;
    if (token) {
        verify(token, jwtSecret, async (err: any, decodedToken: any) => {
            if (err) {
                throw new Error(err);
                res.locals.user = null;
                next();
            }
            else {
                const user = await User.findOne({where: {id: decodedToken.id}})
                res.locals.user = user;
                if (user.role === 'admin') {
                    next()
                }
                else {
                    // throw new Error('This Route is only for Admins');
                    res.send('This Route is only for Admins');
                }
            }
        })
    }
    else {
        res.locals.user = null;
        // throw new Error("Please Login First");
        res.send("Please Login First");
        
    }

}
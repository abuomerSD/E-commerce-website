/**
 * this module is created for handling user database crud
 * 
 */

import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { User } from "../databaseHandler/database";

/**
 * save user
 * 
 */

export const saveUser = asyncWrapper(async (req:Request, res: Response) => {
   const user = req.body;
   const userCreated = await User.create(user);
   res.json(userCreated);
});

/**
 * get all users array as json
 */
export const getAllUsers =  asyncWrapper(async(req: Request, res: Response)=> {
   const users = await User.findAll();
   res.status(200).json(users);
})
/**
 * this module is created for handling user database crud
 * 
 */

import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { User } from "../databaseHandler/database";
import * as bcrypt from 'bcrypt';
import { isEmpty, isEmail } from 'validator';
import * as mailSender from '../utils/mailSender';

/**
 * save user
 * 
 */

export const saveUser = asyncWrapper(async (req:Request, res: Response) => {
   const user = req.body;
   // validate the user input
   if (isEmpty(user.firstName) || isEmpty(user.lastName) || !isEmail(user.email) || isEmpty(user.username) || isEmpty(user.password) || isEmpty(user.role)) {
      throw new Error('User Validation Error');
   }
   else {
      // sendeing email to user
      // mailSender.send
   
      // hashing user's password 
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const userCreated = await User.create(user);
      res.json(userCreated);
   }

});

/**
 * get all users array as json
 */
export const getAllUsers =  asyncWrapper(async(req: Request, res: Response)=> {
   const users = await User.findAll();
   res.status(200).json(users);
})
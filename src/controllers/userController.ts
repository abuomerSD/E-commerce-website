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
import { WEBSITE_NAME } from "../utils/contants";
import * as dotenv from 'dotenv';
import { readFileSync, readFile, link } from 'fs';
import { getAllCategories } from "./categoryController";

dotenv.config({path: '../../.env'});

const websiteName = WEBSITE_NAME;
const myEmail = process.env.EMAIL;

/**
 * save user
 * 
 */

export const saveUser = asyncWrapper(async (req:Request, res: Response) => {
   const user = req.body;
   
   // validate the user input
   if (isEmpty(user.firstName) || isEmpty(user.lastName) || !isEmail(user.email) || isEmpty(user.username) || isEmpty(user.password)) {
      throw new Error('User Validation Error');
   }
   else {
      // hashing user's password and saving the user
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const userCreated: User = await User.create(user);
      
      // rendering the confirmation page
      const categories = await getAllCategories();
  
      res.render('userConfirmation', {title: 'User Confirmation', categories});
      
      // sending confirmation email to user
      let link = `/users/confirmation/${userCreated.id}`;
      let confirmationPageHtml = `
         <h1>Step Shopping</h1>
         <h2>Account Activation</h2>
         <h3>Click this Link to Activate your account</h3>
         <a href= ${link}
      `;
      
      await mailSender.send({
      name: websiteName,
      address: myEmail   
      },
      user.email,
      'Please Activate your Account',
      'Account Activation',
      confirmationPageHtml,
       );

   }

});

/**
 * get all users array as json
 */
export const getAllUsers =  asyncWrapper(async(req: Request, res: Response)=> {
   const users = await User.findAll();
   res.status(200).json(users);
})
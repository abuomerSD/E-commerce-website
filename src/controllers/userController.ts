/**
 * this module is created for handling user database crud
 * 
 */

import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import { Category, User } from "../databaseHandler/database";
import * as bcrypt from 'bcrypt';
import { isEmpty, isEmail } from 'validator';
import * as mailSender from '../utils/mailSender';
import { WEBSITE_NAME } from "../utils/contants";
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';

dotenv.config({path: '../../.env'});

const websiteName = WEBSITE_NAME;
const myEmail = process.env.EMAIL;
const jwtSecret = process.env.JWT_SECRET;

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
      res.json(userCreated);
      
      // sending confirmation email to user
      let link = `${req.headers.host}/shop/signup/confirmation/${userCreated.id}`;
      console.log('confirmation link', link);
      
      let confirmationPageHtml = `
         <h1>Step Shopping</h1>
         <h2>Account Activation</h2>
         <h3>Click this Link to Activate your account</h3>
         <a href= ${link} style="color: white; background: blue">Activate</a>
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

/**
 * renderUserConfirmatoinPage
 */

export const renderUserConfirmatoinPage = asyncWrapper(async (req: Request, res: Response) => {
   const categories = await Category.findAll();
   res.render('confirm', { title: 'User Confirmation', categories })
})

/**
 * activate user when click on confirmation link and render the  home page
 */

export const activateUser = asyncWrapper( async(req: Request, res: Response) => {
   const {userId} = req.params;
   const user = await User.findOne({where: {id: userId}});
   if (user) {
      user.isActive = true;
      await user.save();
      console.log(user);
      
      
      res.redirect('/');
   }
   else {
      res.redirect('/');
   }
} )

function createToken(user: User) {
   const maxAge = 1 * 24 * 60 * 60;
   const token = sign(
      {id: user.id, username: user.username, role: user.role},
      jwtSecret,
      {
         expiresIn: maxAge;
      }
   )
   
}
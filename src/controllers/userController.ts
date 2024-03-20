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
import { MAX_AGE, WEBSITE_NAME } from "../utils/contants";
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import { getAllCategories } from "./categoryController";
import { compare } from 'bcrypt';
let flash = require('connect-flash');


dotenv.config({path: '../../.env'});

const websiteName = WEBSITE_NAME;
const myEmail = process.env.EMAIL;
const jwtSecret: any = process.env.JWT_SECRET;
const maxAge = MAX_AGE;

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
      res.status(201).end();
      
      // sending confirmation email to user
      let link = `${req.headers.host}/shop/signup/confirmation/${userCreated.id}`;
      // console.log('confirmation link', link);
      
      let confirmationPageHtml = `
         <h1>Step Shopping</h1>
         <h2>Account Activation</h2>
         <h3>Click this Link to Activate your account</h3>
         <a href= ${link} style="color: white; background: blue">Activate</a>
         <h5>Confirmation Link:</h5>
         <p>${link}</p>
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

// const maxAge = 1 * 24 * 60 * 60; // 1 day in seconds
export const activateUser = asyncWrapper( async(req: Request, res: Response) => {
   const {userId} = req.params;
   const user = await User.findOne({where: {id: userId}});
   if (user) {
      user.isActive = true;
      await user.save();
      const token = createToken(user);
      res.cookie('jwt', token, {
         httpOnly: true,
         maxAge:  maxAge * 1000, // 1 day in msec
      });
      // res.locals.user = user;
      const categories = await getAllCategories();
      res.redirect('/');
   }
   else {
      res.redirect('/');
   }
} )

function createToken(user: User) {
   const token = sign(
      {id: user.id, username: user.username, role: user.role},
      jwtSecret,
      {
         expiresIn: maxAge,
      }
   )
   return token;
   
}

export const login = asyncWrapper(async (req:Request, res: Response) => {
   const { username, password } = req.body;
   // finding the user on the database
   let user = await User.findOne({where: {username}});

   if (!user) {
      user = await User.findOne({where: {email: username}})
   }

   if (!user) {
      res.status(404).send('user not found');
      // res.flash('success', 'Registration successfully');
      // res.locals.message = req.flash();

   }

   if (user) {
       // comparing the entered password with the hashed password on the database
       const result = await compare(password, user.password);
       if (result) {
           // creating jwt token 
           const token = sign({ id: user.id }, jwtSecret, {
              expiresIn: maxAge,
           });
           res.cookie('jwt', token, {
            maxAge : maxAge * 1000,
            httpOnly: true,
           });
           res.status(200).redirect('/');
       }
       else {
          res.status(400).send('password is not correct');
       }
   }
})

export const logout = asyncWrapper( async (req: Request, res: Response) => {
   // removing jwt token from browser
   res.cookie('jwt', '');
   // redirecting to index page
   res.redirect('/');
})

export const renderEnterYouEmailPage = asyncWrapper(async (req:Request, res: Response) => {
   const categories = await getAllCategories();
   res.status(200).render('enterYourEmail', { title: 'Password Reset' , categories});
})

export const sendPasswordResetConfirmationEmail = asyncWrapper(async (req:Request, res: Response) => {
   const categories = await getAllCategories();
   const { email } = req.body;
   const user: any = await User.findOne({where: {email}});
   const link = `${req.headers.host}/shop/users/password-reset/${user.id}`;
   let confirmationPageHtml = `
   <h1>Step Shopping</h1>
   <h2>Password Reset</h2>
   <h3>Click this Link to Change your Password</h3>
   <a href= ${link} style="color: white; background: blue">Activate</a>
   <h5>Confirmation Link:</h5>
   <p>${link}</p>
`;
await mailSender.send({
name: websiteName,
address: myEmail   
},
user.email,
'Please Reset Your Password',
'Password Reset',
confirmationPageHtml,
 );
   res.status(200).end();
   // res.status(200).render('passwordResetEmailConfirmation', { title: 'Password Reset', categories })
})

export const renderPasswordResetPage = asyncWrapper( async (req:Request, res: Response) => {
   const categories = await getAllCategories();
   const { userId } = req.params;
   res.status(200).render('passwordReset', { title: 'Password Reset', categories , userId});
})

export const updateUser = asyncWrapper(async (req:Request, res: Response) => {
   const id = req.params.userId;
   const newUser = req.body;
   
   // hash user password
   const hashedPassword = await bcrypt.hash(newUser.password, 10);
   newUser.password = hashedPassword;
   // fetch old user 
   const user = await User.findOne({where: {id}});
   user?.set(newUser);
   await user?.save();
   res.status(200).end();
})
import express, {Express, Request, Response} from 'express';
import {config} from 'dotenv';
import  {adminRouter} from './routes/adminRoute'
import {logger} from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import { publicCategoriesRoute, publicProductsRoute, publicRouter } from './routes/publicRoute';
import { isUser } from './middlewares/isUser';
import { getAllCategories } from './controllers/categoryController';
import { checkCategories } from './middlewares/checkCategories';
import { isAdmin } from './middlewares/isAdmin';
let cookieParser = require('cookie-parser')
// let session = require('express-session');
// let flash = require('connect-flash');


const app: Express = express();

config();
const port: Number | String = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'ejs');

// Request logger middleware for Debuging
app.use(logger);

// cookie parser
app.use(cookieParser());

// flash
// app.use(session({cookie: { maxAge: 60000 }}));

// app.use(flash());

// is user middleware 
app.use(isUser);

// check categories middleware
app.use(checkCategories);


// to be sure that the application will accept json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// custom error handler 
app.use(errorHandler);

// handle public routes
app.get('/', (req,res) => {
    res.redirect('/shop');
});


app.use('/shop', publicRouter);

// handle private routes
app.use('/admin', isAdmin ,adminRouter);

// handle public products route 
// app.use('/products', publicProductsRoute);

// handle categories products route 
// app.use('/categories', publicCategoriesRoute);

// handle 404 page

app.use(async (req: Request, res: Response) => {
    const categories = await getAllCategories()
    res.render('404', {title: 'Page Not Found', categories});
})

app.listen(port, ()=> {
    console.log(`server is listening to port : ${port}`);
});
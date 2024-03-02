import express, {Express, Request, Response} from 'express';
import {config} from 'dotenv';
import  {adminRouter} from './routes/adminRoute'
import {logger} from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';
import { publicRouter } from './routes/publicRoute';
const app: Express = express();

config();
const port: Number | String = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'ejs');

// Request logger middleware for Debuging
app.use(logger);

// to be sure that the application will accept json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// custom error handler 
app.use(errorHandler);

// handle public routes
app.get('/', publicRouter);

// handle private routes
app.use('/admin', adminRouter);

// handle 404 page

app.use((req: Request, res: Response) => {
    res.render('404', {title: 'Page Not Found'});
})

app.listen(port, ()=> {
    console.log(`server is listening to port : ${port}`);
});
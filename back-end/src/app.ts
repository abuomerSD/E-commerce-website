import express, {Express, Request, Response} from 'express';
import {config} from 'dotenv';
import  {adminRouter} from './routes/adminRoute'
import {logger} from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import bodyParser from 'body-parser';

const app: Express = express();

config();
const port: Number | String = process.env.PORT || 3000;

// Request logger middleware for Debuging
app.use(logger);

// to be sure that the application will accept json
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// custom error handler 
app.use(errorHandler);

app.use('/admin', adminRouter);

app.listen(port, ()=> {
    console.log(`server is listening to port : ${port}`);
});
import express, {Express, Request, Response} from 'express';
import {config} from 'dotenv';
import  {adminRouter} from './routes/adminRoute'
import {logger} from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

config();
const port: Number | String = process.env.PORT || 3000;

// Request logger middleware for Debuging
app.use(logger);

// to be sure that the application will accept json
app.use(express.json());

// custom error handler 
app.use(errorHandler);

app.use('/admin', adminRouter);

app.listen(port, ()=> {
    console.log(`server is listening to port : ${port}`);
    
});
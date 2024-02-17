import express, {Express, Request, Response} from 'express';
import {config} from 'dotenv';
import  {adminRouter} from './routes/adminRoute'
const app: Express = express();

config();
const port: Number | String = process.env.PORT || 3000;


app.use('/admin', adminRouter);



app.listen(port, ()=> {
    console.log(`server is listening to port : ${port}`);
    
})





import {Request, Response} from 'express';
import { Category } from '../databaseHandler/database';

export const asyncWrapper = (fn: Function) => {
    return (req: Request, res: Response, next: Function)=> {
        fn(req, res, next).catch((err:Error)=> {
            let categories ;
            Category.findAll().then(result => categories = result);
            console.log('error', err.message);
            console.log('stack', err);
            
            res.status(400).render('Error', {error : err, title: 'Error', categories});
        });

    }
}

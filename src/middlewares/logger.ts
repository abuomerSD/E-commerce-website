import {Request, Response} from 'express'
import chalk from 'chalk';


export const logger = (req: Request, res: Response, next: Function) => {
    console.log(`${chalk.green(req.method)} ${chalk.red(req.url)}`);
        
    next();
}
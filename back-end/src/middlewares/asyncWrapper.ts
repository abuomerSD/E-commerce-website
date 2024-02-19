import {Request, Response} from 'express';

export const asyncWrapper = (fn: Function) => {
    return (req: Request, res: Response, next: Function)=> {
        fn(req, res, next).catch((err:Error)=> {
            res.status(400).json({
                status: 'fail',
                data: err,
            })
            next();
        });

        // try {
        //     fn(req, res, next);
        // } catch (error) {
        //     res.status(400).json({
        //         status: 'fail',
        //         data: error,
        //     })
        // }
    }
}

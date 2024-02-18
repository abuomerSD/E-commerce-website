import {Router} from 'express';
import {saveProduct} from '../controllers/productsController'
export const adminRouter = Router();

adminRouter.route('/products').post(saveProduct);
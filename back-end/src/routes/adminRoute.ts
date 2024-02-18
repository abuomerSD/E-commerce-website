import {Router} from 'express';
import {saveProduct} from '../controllers/productsController'
import { saveCategory } from '../controllers/categoryController';
import multer from 'multer';
const upload = multer({dest: 'back-end/uploads/'})
export const adminRouter = Router();

adminRouter.route('/products').post(saveProduct);
adminRouter.route('/categories').post(upload.single('image') ,saveCategory);
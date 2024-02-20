import {Router} from 'express';
export const adminRouter = Router();
import {getAllProducts, getProductById, saveProduct, updateProductById} from '../controllers/productsController'
import { saveCategory } from '../controllers/categoryController';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {        
        cb(null, 'uploads/products-images');
    },
    filename: function(req, file, cb){
        const fileExtention = file.mimetype.split('/')[1];
        const fileName = `product-${Date.now()}.${fileExtention}`;
        cb(null, fileName);
    }
});

const upload = multer({storage: storage, fileFilter: function (req, file, cb){
    const fileType = file.mimetype.split('/')[0];
    if(fileType === 'image')
        cb(null, true);
    else 
        cb(null, false);
}
})

// products routes
adminRouter.route('/products').get(getAllProducts).post(upload.single('image'), saveProduct);
adminRouter.route('/products/:id').get(getProductById).put(upload.single('image') ,updateProductById);

// categories routes
adminRouter.route('/categories').post(saveCategory);
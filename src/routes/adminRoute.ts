import {Router} from 'express';
export const adminRouter = Router();
import {delelteProduct, getAllProducts, getProductById, renderProductsPageWithFilteredProducts, saveProduct, updateProductById, updateProductByIdWithoutImage} from '../controllers/productsController'
import { deleteCategory, getAllCategories, getCategoryById, renderSearchCategoryPage, saveCategory, updateCategory } from '../controllers/categoryController';
import multer from 'multer';
import { renderAddPurchaseInvoicePage, renderAdminHomePage, renderCategoriesPage, renderDashboardPage, renderProductsPage, renderPurchaseInvoicesPage, renderSalesInvoicesPage, renderUsersPage } from '../controllers/controlPanelController';
import { log } from 'console';
import { savePurchaseInvoice } from '../controllers/purchaseInvoiceController';
import { renderShowSalesInvoice } from '../controllers/salesInvoiceController';

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
    console.log('file size',file.size);
    
    if(fileType === 'image')
        cb(null, true);
    else 
        cb(null, false);
}
});


// admin control panel routes 
adminRouter.route('/').get(renderAdminHomePage);


// products routes
adminRouter.route('/products')
.get(renderProductsPage)
.post(upload.single('image'), saveProduct);

adminRouter.route('/searchProduct')
.post(renderProductsPageWithFilteredProducts);

adminRouter.route('/products/:id')
.get(getProductById)
.put(upload.single('image') ,updateProductById)
.delete(delelteProduct);

// this route is only for updating product without updating image
adminRouter.route('/products/updateProductWithoutImage/:id')
.put(updateProductByIdWithoutImage);

// categories routes
adminRouter.route('/categories')
.get(renderCategoriesPage)
.post(saveCategory);

adminRouter.route('/categories/:id')
.get(getCategoryById)
.put(updateCategory)
.delete(deleteCategory);

adminRouter.route('/categories/searchCategory')
.post(renderSearchCategoryPage)

adminRouter.route('/sales-invoices')
    .get(renderSalesInvoicesPage);

adminRouter.route('/sales-invoices/:id')
    .get(renderShowSalesInvoice);

adminRouter.route('/purchase-invoices')
    .get(renderPurchaseInvoicesPage);

adminRouter.route('/users')
    .get(renderUsersPage);

adminRouter.route('/dashboard')
    .get(renderDashboardPage);

adminRouter.route('/add-purchase-invoice')
    .get(renderAddPurchaseInvoicePage)
    .post(savePurchaseInvoice);
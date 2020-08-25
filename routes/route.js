const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();

// For admin
router.get('/api/admin/getListUsers', controller.getListUsers);
router.get('/api/admin/getListProducts', controller.getListProducts);
router.post('/api/admin/addProduct' , controller.postAddProduct);
router.post('/api/admin/updateProduct',controller.postUpdateProduct);
router.post('/api/admin/deleteProduct' , controller.postDeleteProduct);
// router.get('/api/user/getAllData', controller.getAllData);

// For user
router.get('/api/user/getAllData', controller.getAllData);
router.post('/api/user/login', controller.login);
router.post('/api/user/cart',controller.getShoppingCart);
router.post('/api/user/signup', controller.signup)
router.post('/api/user/addRecipient', controller.addRecipient)

// General
router.get('/api/general/categories', controller.getAllCategory);
router.get('/api/general/:idnhomsanpham/products', controller.getProducts);
router.get('/api/general/product/:id', controller.getProductDetails);
// router.post('/api/signup',controller.signup);
// router.post('/api/addNewData' , controller.addNewData);
// router.put('/api/updateData',controller.updateData);
// router.delete('/api/deleteData' , controller.deleteData);

module.exports = router;
const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();
router.get('/api/user/getAllData', controller.getAllData);
router.post('/api/user/login', controller.login);
router.post('/api/user/cart',controller.getShoppingCart);


// General
router.get('/api/general/categories', controller.getAllCategory);
// router.post('/api/signup',controller.signup);
router.post('/api/addNewData' , controller.addNewData);
router.put('/api/updateData',controller.updateData);
router.delete('/api/deleteData' , controller.deleteData);

module.exports = router;
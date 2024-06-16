const productController = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductsById);
router.post('/products', productController.createProducts);

module.exports = router;
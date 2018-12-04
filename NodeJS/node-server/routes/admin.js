const express = require('express');

const router = express.Router();
const ProductsController = require('../controllers/products.js');

router.get('/add-product', ProductsController.getAddProduct);

router.post('/add-product', ProductsController.addProduct);

module.exports = router;

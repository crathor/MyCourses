const express = require('express');
const path = require('path');

const rootDir = require('../helpers/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const { products } = adminData;
  res.render('shop', {
    products,
    pageTitle: 'Shop',
    path: '/shop',
    hasProducts: products.length > 0,
  });
});

module.exports = router;

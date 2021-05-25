const express = require('express');
const router = express.Router();
const getProductsCtrl = require('../products/getProducts.ctrl');
const putProductCtrl = require('../products/putProduct.ctrl');
const postProductCtrl = require('../products/postProduct.ctrl');
const deleteProductCtrl = require('../products/deleteProduct.ctrl');

router.get('/', getProductsCtrl.getProducts);
router.get('/:id', getProductsCtrl.getProductByid);

router.post('/', postProductCtrl.postProduct);

router.put('/:id', putProductCtrl.putProduct);

router.delete('/:id', deleteProductCtrl.deleteProduct);

module.exports = router;

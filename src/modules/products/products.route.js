const express = require('express');
const router = express.Router();
const validate = require('../../service/validate');
const getProductsCtrl = require('../products/getProducts.ctrl');
const putProductCtrl = require('../products/putProduct.ctrl');
const postProductCtrl = require('../products/postProduct.ctrl');
const deleteProductCtrl = require('../products/deleteProduct.ctrl');

router.get('/', validate.auth, getProductsCtrl.getProducts);
router.get('/:id', validate.auth, getProductsCtrl.getProductByid);

router.post('/', postProductCtrl.postProduct);

router.put('/:id', validate.auth, putProductCtrl.putProduct);

router.delete('/:id', validate.auth, deleteProductCtrl.deleteProduct);

module.exports = router;

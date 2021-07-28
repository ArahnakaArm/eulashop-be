const express = require('express');
const router = express.Router();
const validate = require('../../service/validate');
const postOrderCtrl = require('../orders/postOrder.ctrl');
const getOrderCtrl = require('../orders/getOrders.ctrl');
const putOrderCtrl = require('../orders/putOrder.ctrl');
const deleteOrderCtrl = require('../orders/deleteOrder.ctrl');

router.get('/', validate.auth, getOrderCtrl.getOrders);
router.get('/:id', validate.auth, getOrderCtrl.getOrderByid);

router.post('/', validate.auth, postOrderCtrl.postOrder);

router.put('/:id', validate.auth, putOrderCtrl.putOrder);

router.delete('/:id', validate.auth, deleteOrderCtrl.deleteOrder);
module.exports = router;

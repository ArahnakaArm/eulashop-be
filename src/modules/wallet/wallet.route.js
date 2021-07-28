const express = require('express');
const router = express.Router();
const validate = require('../../service/validate');
const postWalletCtrl = require('../wallet/postWallet.ctrl');

router.post('/', validate.auth, postWalletCtrl.postWallet);

module.exports = router;

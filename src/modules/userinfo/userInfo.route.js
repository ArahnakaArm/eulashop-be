const express = require('express');
const router = express.Router();
const validate = require('../../service/validate');
const getUsersInfoCtrl = require('../userinfo/getUsersInfo.Ctrl');

router.get('/', validate.auth, getUsersInfoCtrl.getUsers);
router.get('/:id', validate.auth, getUsersInfoCtrl.getUserByid);

module.exports = router;

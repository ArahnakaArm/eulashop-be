const express = require('express');
const router = express.Router();

const signupCtrl = require('../user/signup.ctrl');
const loginpCtrl = require('../user/login.ctrl');

router.post('/signup', signupCtrl.signup);
router.post('/login', loginpCtrl.login);

module.exports = router;

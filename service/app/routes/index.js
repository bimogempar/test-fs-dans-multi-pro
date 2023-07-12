const express = require('express');
const router = express.Router();

const userController = require('../modules/user/userController');
const { authorizationToken } = require('../middleware');

router.post('/login', userController.doLogin)
router.post('/register', userController.doRegister)
router.get('/users', authorizationToken, userController.getAllUsers)

module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../modules/user/userController');

router.post('/login', userController.doLogin)
router.post('/register', userController.doRegister)
router.get('/users', userController.getAllUsers)

module.exports = router;
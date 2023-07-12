const express = require('express');
const router = express.Router();

const userController = require('../modules/user/userController');

router.get('/users', userController.getAllUsers)

module.exports = router;
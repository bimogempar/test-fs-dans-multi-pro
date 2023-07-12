const express = require('express');
const router = express.Router();

const userController = require('../entity/user/userController');

router.get('/user', userController.getUser)

module.exports = router;
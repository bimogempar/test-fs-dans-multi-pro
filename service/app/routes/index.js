const express = require('express');
const router = express.Router();

const userController = require('../modules/user/userController');
const jobController = require('../modules/job/jobController');
const { authorizationToken } = require('../middleware');

router.post('/login', userController.doLogin)
router.post('/register', userController.doRegister)
router.get('/users', authorizationToken, userController.getAllUsers)

router.get('/list-jobs', authorizationToken, jobController.getListJobs);

module.exports = router;
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
router.post('/', AuthController.handleLogin);
module.exports = router;

const _ = require('lodash');

const express = require('express');
const router = express.Router();

const refreshTokenController = require('../controllers/refreshTokenController.js');

router.route('/')
    .get(refreshTokenController.refreshToken);

module.exports = router;
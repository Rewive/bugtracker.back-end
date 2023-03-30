const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const getMembers = require('./getMembers');

router.post('/product', checkAuth, getMembers);

module.exports = router;
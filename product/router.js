const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const getMembers = require('./Members');

router.post('/api/product/id/members/', checkAuth, getMembers);

module.exports = router;
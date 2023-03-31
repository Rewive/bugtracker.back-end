const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const validateAuth = require('../middlewares/validateAuth');
const setAuth = require('./setAuth');
const setData = require('./setData');
const setJob = require('./setJob');
const signIn = require('./SignIn');

router.post('/api/main/auth/', checkAuth, async (req, res) => {
    res.status(200).json({ message: 'Authorization' });
});

router.post('/api/main/clear/', async (req, res) => {
    res.clearCookie('secid').status(200).json({ message: 'OK' });;
});

router.post('/api/main/signin/', validateAuth, signIn);

router.post('/api/main/signup/', validateAuth, setData);

router.post('/api/main/signup/verify/', validateAuth, setAuth);

router.post('/api/main/job/', validateAuth, setJob);

module.exports = router;
const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const validateAuth = require('../middlewares/validateAuth');
const setAuth = require('./setAuth');
const setData = require('./setData');
const setJob = require('./setJob');
const signIn = require('./SignIn');

router.get('/', checkAuth, async (req, res) => {
    res.render(`authorization`);
});

router.post('/sign', checkAuth, async (req, res) => {
    res.render(`signUp`);
});

router.post('/exit', async (req, res) => {
    res.clearCookie('secid').redirect(`/`);
});

router.post('/', validateAuth, signIn);

router.post('/signup', validateAuth, setData);

router.post('/verify', validateAuth, setAuth);

router.post('/select', validateAuth, setJob);

module.exports = router;
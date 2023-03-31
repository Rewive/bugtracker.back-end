const express = require('express');
const User = require('../models/Users');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('token');

module.exports = async (req, res) => {
    const login = req.body.login;
    const check = await User.get({ login });
    if (!check) return res.status(401).json({ message: "Unauthorized" });
    const password = check.password.toString();
    if (await argon2.verify(`${password}`, `${req.body.password}`)) {
        const token = jwt.sign({ id: check._id }, secret, { expiresIn: '30d' });
        await User.set({ password, login }, { $set: { token } });
        return res.cookie(`secid`, `${token}`, { httpOnly: true, sameSite: true, secure: true, maxAge: 2592000000, sameSite: 'none' }).status(200).json({ status: "OK" });
    }
    res.status(401).json({ message: "Unauthorized" });
}
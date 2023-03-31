const express = require('express');
const User = require('../models/Users');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('token');

module.exports = async (req, res) => {
    const token = req.cookies.secid;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const data = jwt.verify(token, secret);
    const id = new ObjectId(data.id);
    const job = req.body.job;
    const jobMap = {
        leader: 'Руководитель',
        pm: 'PM-менеджер',
        qa: 'QA-тестировщик',
        dev: 'Разработчик'
    };
    if (!job || !jobMap[job]) return res.status(400).json({ message: "Bad Request" });
    const rujob = jobMap[job];
    if (await User.get({ _id: id })) {
        await User.set({ _id: id }, { $set: { job, rujob } });
        return res.status(200).json({ status: "OK" });
    }
    res.status(401).json({ message: "Unauthorized" });
}
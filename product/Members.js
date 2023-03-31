const express = require('express');
const Product = require('../models/Product');
const User = require('../models/Users');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('token');

getUserData = (check) => {
    const { name, lastname, login, job, rujob } = check;
    return { name: name, lastname: lastname, login: login, job: job, rujob: rujob };
}

module.exports = async (req, res) => {
    const { product } = req.body;
    const token = req.cookies.secid;
    if (!token) return res.status(401).json('Unauthorized');
    try {
        const data = jwt.verify(token, secret);
        const id = new ObjectId(data.id);
        const check = await User.get({ _id: id, token: token });
        if (check) {
            const checkprod = await Product.get({ product });
            const checkuser = await Product.get({ product, 'members.login': check.login.toString() });
            if (checkprod && !checkuser) {
                await Product.set({ product }, { $push: { members: getUserData(check) } });
                const checkprod = await Product.get({ product });
                return res.status(200).json(checkprod)
            } else if (checkuser) {
                await Product.set({ product, 'members.login': check.login.toString() }, { $set: { "members.$": getUserData(check) } });
                const checkprod = await Product.get({ product });
                return res.status(200).json(checkprod)
            }
            res.status(400).json({error: "Bad Request", msg: "Данного продукта не существует"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}
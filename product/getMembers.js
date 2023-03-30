const express = require('express');
const db = require('../controllers/db');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('token');

getUserData = (check) => {
    const { name, lastname, login, job, rujob } = check;
    return { name: name.toString(), lastname: lastname.toString(), login: login.toString(), job: job.toString(), rujob: rujob.toString() };
}

module.exports = async (req, res) => {
    const { product } = req.body;
    const token = req.cookies.secid;
    if (!token) return res.status(401).json('Unauthorized');
    try {
        const data = jwt.verify(token, secret);
        const id = new ObjectId(data.id);
        const check = await db.UserGet({ _id: id, token: token });
        if (check) {
            const checkprod = await db.ProdGet({ product });
            const checkuser = await db.ProdGet({ product, 'members.login': check.login.toString() });
            if (checkprod && !checkuser) {
                await db.ProdSet({ product }, { $push: { members: getUserData(check) } });
                const checkprod = await db.ProdGet({ product });
                return res.status(200).json(checkprod)
            } else if (checkuser) {
                await db.ProdSet({ product, 'members.login': check.login.toString() }, { $set: { "members.$": getUserData(check) } });
                const checkprod = await db.ProdGet({ product });
                return res.status(200).json(checkprod)
            }
            res.status(400).json({error: "Bad Request", msg: "Нейдействительный ID"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}
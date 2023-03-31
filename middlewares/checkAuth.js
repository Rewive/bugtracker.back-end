const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/Users');
const config = require('config');
const secret = config.get('token');

module.exports = async (req, res, next) => {
    const token = req.cookies.secid;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const data = jwt.verify(token, secret);
        const id = new ObjectId(data.id);
        if (!await User.get({ id, token })) next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
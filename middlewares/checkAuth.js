const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const db = require('../controllers/db');
const config = require('config');
const secret = config.get('token');

module.exports = async (req, res, next) => {
    const token = req.cookies.secid;
    if (!token) return res.render(`main`);
    try {
      const data = jwt.verify(token, secret);
      const id = new ObjectId(data.id);
      if (!await db.UserGet({ id, token })) next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        return res.render(`main`);
      } else {
        // обработка других ошибок
        console.log(err);
      }
    }
  }
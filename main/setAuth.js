const User = require('../models/Users');
const ObjectId = require('mongodb').ObjectId;
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('token');

module.exports = async (req, res, next) => {
  try {
    const { login } = req.body;
    const id = new ObjectId(req.body.id);
    if (!id) res.status(401).send({ message: "Unauthorized" });
    if (await User.get({ login })) return res.status(400).json({ errors: [{ message: "Bad request", param: "login", msg: "Данный login уже используется" }] });
    const response = await User.get({ _id: req.body.id })
    if (response.token && response.password) return res.status(400).json({ errors: [{ message: "Bad request", param: "auth", msg: "Вы не можете зарегистрировать больше 1 раза" }] });
    const password = await argon2.hash(req.body.password);
    const token = jwt.sign({ id }, secret, { expiresIn: '30d' });
    await User.set({ _id: id }, { $set: { login, password, token } });
    res.cookie(`secid`, `${token}`, { httpOnly: true, sameSite: true, secure: true, maxAge: 2592000000, sameSite: 'none' }).status(200).json({ status: "OK" });
  } catch (err) {
    // передача ошибки в обработчик ошибок
    next(err);
  }
};
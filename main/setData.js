const User = require('../models/Users');

module.exports = async (req, res) => {
    const { name, lastname, email } = req.body
    if (await User.get({ email: email.toLowerCase() })) return res.status(400).json({errors: [{nparam: "email", msg: "Данный email уже используется"}]});
    const insert = await User.insert({ name, lastname, email: email.toLowerCase() });
    res.status(200).json({ status: "OK", id: insert._id });
};
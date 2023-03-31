const mongoose = require('./db');

const userSchema = new mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    login: { type: String, unique: true },
    token: { type: String, unique: true },
    job: { type: String },
    rujob: { type: String }
})

const User = mongoose.model('users', userSchema);

exports.get = async (data) => {
    try {
        return await User.findOne(data);
    } catch (err) {
        console.log(err);
    }
};

exports.set = async (find, set) => {
    try {
        return await User.updateOne(find, set);
    } catch (err) {
        console.log(err);
    }
};

exports.insert = async (insert) => {
    try {
        const user = new User(insert);
        return await user.save();
    } catch (err) {
        console.log(err);
    }
};
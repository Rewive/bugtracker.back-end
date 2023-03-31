const mongoose = require('./db');

const prodSchema = new mongoose.Schema({
    company: { type: String },
    prodname: { type: String },
    product: { type: String, unique: true },
    members: [{
        name: { type: String },
        lastname: { type: String },
        login: { type: String, unique: true },
        job: { type: String },
        rujob: { type: String },
    }]
})

const Product = mongoose.model('products', prodSchema);

exports.get = async (data) => {
    try {
        return await Product.findOne(data);
    } catch (err) {
        console.log(err);
    }
};

exports.set = async (find, set) => {
    try {
        return await Product.updateOne(find, set);
    } catch (err) {
        console.log(err);
    }
};
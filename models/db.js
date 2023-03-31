const mongoose = require('mongoose');
const config = require('config');
const url = config.get('mongoUri');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => {
    console.error(`Error connecting to MongoDB: ${err}`);
});

module.exports = mongoose;
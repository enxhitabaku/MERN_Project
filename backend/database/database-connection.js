require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user');
const Place = require('./models/user');

const databaseConnect = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
        });

        await Promise.all([
            User.createCollection(),
            Place.createCollection()
        ]);

        return connection;
    } catch (err) {
        throw err;
    }

};

const databaseDisconnect = async () => mongoose.disconnect();

module.exports = {
    databaseConnect,
    databaseDisconnect,
};


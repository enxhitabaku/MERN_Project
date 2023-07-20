require('dotenv').config()
const mongoose = require('mongoose');

const databaseConnect = async () => {
    return mongoose.connect(process.env.MONGO_DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false,
    });
};

const databaseDisconnect = async () => mongoose.disconnect();

module.exports = {
    databaseConnect,
    databaseDisconnect,
};


require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const {onNoHTTPStatusCodeDetected, onRouteNotFound} = require("./middleware/http-error");
const {databaseConnect} = require("./database/database-connection");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use(onRouteNotFound);

app.use(onNoHTTPStatusCodeDetected);

databaseConnect()
    .then(() => {
        app.listen(process.env.DEV_SERVER_PORT_NO)
    })
    .catch((err) => {
        console.error(err);
    })



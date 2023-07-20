require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const {onNoHTTPStatusCodeDetected, onRouteNotFound} = require("./middleware/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use(onRouteNotFound);

app.use(onNoHTTPStatusCodeDetected);

app.listen(process.env.DEV_SERVER_PORT_NO);


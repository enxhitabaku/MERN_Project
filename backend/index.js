const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");
const {onNoHTTPStatusCodeDetected, onRouteNotFound} = require("./middleware/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use(onRouteNotFound);

app.use(onNoHTTPStatusCodeDetected);

app.listen(5000);


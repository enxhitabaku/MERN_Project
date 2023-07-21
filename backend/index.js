require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const {onNoHTTPStatusCodeDetected, onRouteNotFound, onInvalidFileSubmission} = require("./middleware/on-errors");
const {databaseConnect} = require("./database/database-connection");
const path = require("path");
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(mongoSanitize({
    allowDots: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");

    next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use(onRouteNotFound);

app.use(onInvalidFileSubmission)

app.use(onNoHTTPStatusCodeDetected);

databaseConnect()
    .then(() => {
        app.listen(process.env.DEV_SERVER_PORT_NO)
    })
    .catch((err) => {
        console.error(err);
    })



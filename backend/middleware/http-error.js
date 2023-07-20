const HttpError = require("../models/http-error");

function onRouteNotFound(req, res, next) {
    throw new HttpError("Could not find this route.", 404)
}

function onNoHTTPStatusCodeDetected(error, req, res, next) {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
}

module.exports = {
    onRouteNotFound: onRouteNotFound,
    onNoHTTPStatusCodeDetected, onNoHTTPStatusCodeDetected
}

const HttpError = require("../models/http-error");
const fs = require("fs");

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

function onInvalidFileSubmission(error, req, res, next) {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
}

module.exports = {
    onRouteNotFound: onRouteNotFound,
    onNoHTTPStatusCodeDetected,
    onInvalidFileSubmission
}

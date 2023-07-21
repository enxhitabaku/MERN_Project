require("dotenv").config();
const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; //"Bearer TOKEN"
        if (!token) {
            throw new Error("Authentication failed!");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.userData = {id: decodedToken.userId}
        next();
    } catch (err) {
        const httpError = new HttpError("Authentication failed!", 401);
        return next(httpError);
    }

}

module.exports = checkAuth;

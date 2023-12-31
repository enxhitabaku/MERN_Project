const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const {
    retrieveUserFromDatabase,
    createNewUserOnDatabase,
    authenticateUser,
    retrieveAllUsersFromDatabase
} = require("../database/services/user-service");

async function getUserById(req, res, next) {
    const {userId} = req.body;
    const useResponse = await retrieveUserFromDatabase(userId);
    if (!useResponse.success) {
        const httpError = new HttpError(useResponse.message, useResponse.httpStatusCode);
        return next(httpError);
    }
    res.status(useResponse.httpStatusCode).json(useResponse.result);
}

async function getUsers(req, res, next) {
    const allUsersResponse = await retrieveAllUsersFromDatabase();
    if (!allUsersResponse.success) {
        const httpError = new HttpError(allUsersResponse.message, allUsersResponse.httpStatusCode);
        return next(httpError);
    }
    res.status(allUsersResponse.httpStatusCode).json(allUsersResponse.result);
}

async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const {gender, email, password} = req.body;

    const newUserResponse = await createNewUserOnDatabase(gender, email, password);
    if (!newUserResponse.success) {
        const httpError = new HttpError(newUserResponse.result, newUserResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(newUserResponse.httpStatusCode).json(newUserResponse.result);
}

async function login(req, res, next) {

    const {email, password} = req.body;

    const authenticateUserResponse = await authenticateUser(email, password);
    if (!authenticateUserResponse.success) {
        const httpError = new HttpError(authenticateUserResponse.message, authenticateUserResponse.httpStatusCode);
        return next(httpError);
    }

    res.status(authenticateUserResponse.httpStatusCode).json(authenticateUserResponse.result);
}

module.exports = {
    getUserById: getUserById,
    getUsers: getUsers,
    signup: signup,
    login: login
}

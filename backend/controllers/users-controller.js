const {validationResult} = require('express-validator');
const uuid = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        gender: 'male',
        email: 'test@test.com',
        password: 'testers'
    }
];

function getUsers(req, res, next) {
    res.json({users: DUMMY_USERS});
}

function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const {gender, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser) {
        throw new HttpError('Could not create user, email already exists.', 422);
    }

    const createdUser = {
        id: uuid.v4(),
        gender,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
}

function login(req, res, next) {
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }

    const {email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }

    res.json({message: 'Logged in!'});
}

module.exports = {
    getUsers: getUsers,
    signup: signup,
    login: login
}

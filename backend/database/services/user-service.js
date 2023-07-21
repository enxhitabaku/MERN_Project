require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ServiceResponse = require("../../shared/service-response");
const {createJWT, mapToPartialUserData} = require("../../shared/utils");

async function retrieveUserFromDatabase(userId) {
    try {
        //On user retrival the password field will be omitted for security reasons
        const user = await User.findOne({id: userId}, '-password');
        if (!user) {
            return ServiceResponse.error(`Unable to find user with id ${userId}`, 404);
        }
        return ServiceResponse.success({user: user}, 200)
    } catch (err) {
        return ServiceResponse.error('Fetching user failed, please try again later.', 500);
    }
}

async function retrieveAllUsersFromDatabase() {
    try {
        //On users retrival the password field will be omitted for security reasons
        const users = await User.find({}, '-password');

        const usersWithGetters = users.map(user => user.toObject({getters: true}));
        return ServiceResponse.success({users: usersWithGetters}, 200)
    } catch (err) {
        return ServiceResponse.error('Fetching users failed, please try again later.', 500);
    }
}

async function createNewUserOnDatabase(gender, email, password) {
    try {
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return ServiceResponse.error('User exists already, please login instead.', 422);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = new User({
            gender,
            email,
            password: hashedPassword,
            places: []
        });

        await createdUser.save();

        const userObject = createdUser.toObject({getters: true});
        const jwtToken = createJWT(userObject.id, userObject.email);
        const partialUserData = mapToPartialUserData(userObject, jwtToken);

        return ServiceResponse.success({user: partialUserData}, 201);
    } catch (err) {
        return ServiceResponse.error('Signing up failed, please try again later.', 500);
    }
}

async function authenticateUser(email, password) {
    try {
        const existingUser = await User.findOne({email: email})
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!existingUser || !isValidPassword) {
            return ServiceResponse.error('Invalid credentials, could not log you in.', 401);
        }

        const userObject = existingUser.toObject({getters: true});
        const jwtToken = createJWT(userObject.id, userObject.email);
        const partialUserData = mapToPartialUserData(userObject, jwtToken);

        return ServiceResponse.success({user: partialUserData}, 200);
    } catch (err) {
        return ServiceResponse.error('Logging in failed, please try again later.', 500);
    }
}

module.exports = {
    retrieveUserFromDatabase,
    createNewUserOnDatabase,
    authenticateUser,
    retrieveAllUsersFromDatabase
}

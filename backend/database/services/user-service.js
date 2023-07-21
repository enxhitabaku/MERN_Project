require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ServiceResponse = require("../../shared/service-response");
const {createJWT, mapToPartialUserData} = require("../../services/security-service");

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

        return ServiceResponse.success(partialUserData, 201);
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

        return ServiceResponse.success(partialUserData, 200);
    } catch (err) {
        return ServiceResponse.error('Logging in failed, please try again later.', 500);
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

module.exports = {
    createNewUserOnDatabase,
    authenticateUser,
    retrieveAllUsersFromDatabase
}

const User = require('../models/user')
const ServiceResponse = require("../../shared/service-response");

const DUMMY_IMAGE_SRC = 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg';

async function createNewUserOnDatabase(gender, email, password) {
    try {
        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return ServiceResponse.error('User exists already, please login instead.', 422);
        }

        const createdUser = new User({
            gender,
            email,
            image: DUMMY_IMAGE_SRC,
            password,
            places: []
        });

        await createdUser.save();
        return ServiceResponse.success({user: createdUser.toObject({getters: true})}, 201)
    } catch (err) {
        return ServiceResponse.error('Signing up failed, please try again later.', 500);
    }
}

async function authenticateUser(email, password) {
    try {
        const existingUser = await User.findOne({email: email})
        if (!existingUser || existingUser.password !== password) {
            return ServiceResponse.error('Invalid credentials, could not log you in.', 401);
        }

        const userObject = existingUser.toObject({getters: true});
        const partialUserData = {
            id: userObject.id,
            email: userObject.email,
            gender: userObject.gender,
            places: userObject.places
        }
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

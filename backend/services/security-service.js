const jwt = require("jsonwebtoken");

function createJWT(userId, userEmail) {
    try {
        return jwt.sign(
            {userId: userId.id, email: userEmail.email},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '1h'}
        );
    } catch (err) {
        throw err;
    }
}

function mapToPartialUserData(userObject, jwtToken) {
    return {
        id: userObject.id,
        gender: userObject.gender,
        email: userObject.email,
        places: userObject.places,
        token: jwtToken
    }
}

module.exports = {
    createJWT,
    mapToPartialUserData
}

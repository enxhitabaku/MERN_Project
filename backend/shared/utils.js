const jwt = require("jsonwebtoken");

/**
 * @param {string} userId
 */
function createJWT(userId) {
    try {
        return jwt.sign(
            {userId: userId},
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
        token: jwtToken
    }
}

module.exports = {
    createJWT,
    mapToPartialUserData
}

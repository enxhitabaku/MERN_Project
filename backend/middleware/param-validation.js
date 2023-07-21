const {check} = require("express-validator");

function validatePlaceParamsOnCreate() {
    return [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .not()
            .isEmpty(),
        check('latitude')
            .isString()
            .matches(/^(?:39|4[0-2])(?:\.\d+)?$/),
        check('longitude')
            .isString()
            .matches(/^(?:19|2[0-1])(?:\.\d+)?$/)
    ]
}

function validatePlaceParamOnUpdate() {
    return [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .not()
            .isEmpty()
    ]
}

function validateUserParamsOnSignUp() {
    return [
        check('gender')
            .isString()
            .isIn(["male", "female"]),
        check('email')
            .isString()
            .matches(/^\S+@\S+\.\S+$/),
        check('password').isLength({min: 9})
    ]
}

function validateUserParamsOnLogIn() {
    return [
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({min: 9})
    ]
}

module.exports = {
    validatePlaceParamsOnCreate: validatePlaceParamsOnCreate(),
    validatePlaceParamOnUpdate: validatePlaceParamOnUpdate(),
    validateUserParamsOnSignUp: validateUserParamsOnSignUp(),
    validateUserParamsOnLogIn: validateUserParamsOnLogIn()
}

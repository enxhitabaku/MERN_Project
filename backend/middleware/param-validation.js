const {check} = require("express-validator");

function validatePlaceParamsOnCreate() {
    return [
        check('title')
            .not()
            .isEmpty(),
        check('description').isLength({min: 5}),
        check('location.latitude')
            .isString()
            .matches(/^[1-9]\d*$/),
        check('location.longitude')
            .isFloat({min: 1})
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
            .normalizeEmail()
            .isEmail(),
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

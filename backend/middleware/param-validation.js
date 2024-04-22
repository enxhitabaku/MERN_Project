const {check} = require("express-validator");

const validatePlaceParamsOnCreate = [
    check('title')
        .trim()
        .not()
        .isEmpty(),
    check('description')
        .trim()
        .not()
        .isEmpty(),
    check('latitude')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .matches(/^(?:39|4[0-2])(?:\.\d+)?$/),
    check('longitude')
        .trim()
        .not()
        .isEmpty()
        .isString()
        .matches(/^(?:19|2[0-1])(?:\.\d+)?$/)
];

const validatePlaceParamOnUpdate = [
    check('title')
        .trim()
        .not()
        .isEmpty(),
    check('description')
        .trim()
        .not()
        .isEmpty()
]

//Password Req.:
// Has minimum 8 characters in length. {8,}
// At least one uppercase English letter.  (?=.*?[A-Z])
// At least one lowercase English letter. (?=.*?[a-z])
// At least one digit. (?=.*?[0-9])
// At least one special character. (?=.*?[#?!@$%^&*-])
const validateUserParamsOnSignUp = [
    check('gender')
        .isString()
        .isIn(["male", "female"]),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail(),
    check('password')
        .isString()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
]

const validateUserParamsOnLogIn = [
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail(),
    check('password')
        .isString()
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
]

module.exports = {
    validatePlaceParamsOnCreate: validatePlaceParamsOnCreate,
    validatePlaceParamOnUpdate: validatePlaceParamOnUpdate,
    validateUserParamsOnSignUp: validateUserParamsOnSignUp,
    validateUserParamsOnLogIn: validateUserParamsOnLogIn
}

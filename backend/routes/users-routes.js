const express = require('express');
const {check} = require('express-validator');

const usersController = require('../controllers/users-controller')
const router = express.Router();

const DummyUsersList = [
    {
        id: '1',
        fullName: 'Remy John',
        placeCount: 2,
    },
    {
        id: '2',
        fullName: 'John Sina',
        placeCount: 1,
    },
]

router.get('/', usersController.getUsers);

router.post('/sign-up',
    [
        check('gender')
            .isString()
            .isIn(["male", "female"]),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({min: 9})
    ],
    usersController.signup);

router.post('/log-in', [
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({min: 9})
    ],
    usersController.login);

module.exports = router;

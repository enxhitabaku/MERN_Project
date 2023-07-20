const express = require('express');

const usersController = require('../controllers/users-controller')
const {validateUserParamsOnLogIn, validateUserParamsOnSignUp} = require("../middleware/param-validation");
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

router.post('/sign-up', validateUserParamsOnSignUp, usersController.signup);

router.post('/log-in', validateUserParamsOnLogIn, usersController.login);

module.exports = router;

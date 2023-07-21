const express = require('express');

const usersController = require('../controllers/users-controller')
const {validateUserParamsOnLogIn, validateUserParamsOnSignUp} = require("../middleware/param-validation");
const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/user', usersController.getUserById);

router.post('/sign-up', validateUserParamsOnSignUp, usersController.signup);

router.post('/log-in', validateUserParamsOnLogIn, usersController.login);

module.exports = router;

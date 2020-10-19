const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user/user.model');

const {
    validateCreateUserMiddleware,
} = require('../user/user.validator');

const {
    validateLoginMiddleware,
} = require('./auth.validator');

const {
    registrationController,
    loginController,
} = require('./auth.controllers');

const authRouter = Router();

authRouter.post('/registration',
validateCreateUserMiddleware,
registrationController
)

authRouter.post('/login',
validateLoginMiddleware,
loginController
)

module.exports = {
    authRouter,
}
const {Router} = require('express');
const {authMiddelware} = require('../middlewares/auth.middleware');
const {roleMiddleware} = require('../middlewares/role.middleware');

const {
    getUsersController,
    getUserByIdController,
    getCurrentUserController,
    addFavoriteProductController,
    createUserController,
    updateUserController,
    deleteUserController,
    removeFavoriteProduct,
    changePassword,
    updateUserAddressController,
} = require('./user.controllers');

const {
    validateCreateUserMiddleware,
    validateUpdateUserMiddleware,
    validateChangePasswordMiddleware,
    validateUpdateAddressMiddleware,
} = require('./user.validator');

const userRoter = Router();

userRoter.get(
    '/',
    getUsersController
)

userRoter.get(
    '/getById/:id',
    authMiddelware,
    getUserByIdController
)

userRoter.get(
    '/currentUser',
    authMiddelware,
    getCurrentUserController
)

userRoter.get(
    '/addFavoriteProduct/:productId',
    authMiddelware,
    addFavoriteProductController,
)

userRoter.delete(
    '/removeFavoriteProduct/:productId',
    authMiddelware,
    removeFavoriteProduct,
)

userRoter.patch(
    '/changePassword',
    authMiddelware,
    validateChangePasswordMiddleware,
    changePassword,
)

userRoter.patch(
    '/updateAddress',
    authMiddelware,
    validateUpdateAddressMiddleware,
    updateUserAddressController,
)


userRoter.post(
    '/',
    authMiddelware,
    roleMiddleware(['ADMIN']),
    validateCreateUserMiddleware,
    createUserController
)

userRoter.patch(
    '/',
    authMiddelware,
    validateUpdateUserMiddleware,
    updateUserController,
    )

userRoter.delete(
    '/:id', 
    authMiddelware,
    roleMiddleware(['ADMIN']),
    deleteUserController,
    )

module.exports = {
    userRoter,
}
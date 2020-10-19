const {Router} = require('express');
const {authMiddelware} = require('../middlewares/auth.middleware');

const {
    getOrdersController,
    createOrderController,
} = require('./orders.controllers');

const {
    validateCreateOrderMiddleware,
} = require('./orders.validator');

const orderRouter = Router();

orderRouter.get(
    '/',
    authMiddelware,
    getOrdersController
)

orderRouter.post(
    '/',
    authMiddelware,
    validateCreateOrderMiddleware,
    createOrderController
)

module.exports = {
    orderRouter,
}
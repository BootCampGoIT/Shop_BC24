const { Router } = require('express');
const { authMiddelware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');


const {
    getProductsController,
    createProductController,
    getCategoryController,
    uploadPhotoController,
    deleteProductController
} = require('./products.controllers');

const {
    validateCreateProductMiddleware,
    validateUpdateProductMiddleware,
    validateUploadPhotoMiddleware,
} = require('./products.validator');

const productRouter = Router();

productRouter.get(
    '/',
    getProductsController
)

productRouter.post(
    '/',
    authMiddelware,
    validateCreateProductMiddleware,
    createProductController
)

productRouter.delete(
    '/:productId',
    authMiddelware,
    deleteProductController
)

productRouter.patch(
    '/uploadPhoto',
    authMiddelware,
    validateUploadPhotoMiddleware,
    uploadPhotoController
)

productRouter.get(
    '/getCategories',
    getCategoryController
)

module.exports = {
    productRouter,
}
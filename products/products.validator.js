const Joi = require('joi');

const CreateProductSchema = Joi.object({
    name: Joi
            .string()
            .min(2)
            .max(20)
            .required(),

    category: Joi
            .string()
            .required(),

    images: Joi.array().items(Joi.string()),

    description: Joi
            .string(),
    price: Joi
        .number()
        .required(),

    totalQuantity: Joi
        .number(),
})

const UpdateProductSchema = Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(20),

    category: Joi
        .string(),

    description: Joi
        .string(),

    price: Joi
        .number(),

    totalQuantity: Joi
        .number(),
})

const UploadPhotoSchema = Joi.object({
    productId: Joi
        .string()
        .required(),

    images: Joi.array().items(Joi.string()),
})


const validate = async (schema, data) => {
    const {error} = await schema.validate(data);
    if (error) {
        const message = error.details.reduce((message, item) => {
            if (message) return `${message}, ${item.message}`
            return `${item.message}`
        }, '')
        throw new Error(message)
    }
}

const validateCreateProductMiddleware = async (req, res, next) => {
    try {
        await validate(CreateProductSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}

const validateUpdateProductMiddleware = async (req, res, next) => {
    try {
        await validate(UpdateProductSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}

const validateUploadPhotoMiddleware = async (req, res, next) => {
    try {
        await validate(UploadPhotoSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}


module.exports = {
    validateCreateProductMiddleware,
    validateUpdateProductMiddleware,
    validateUploadPhotoMiddleware,
}
const Joi = require('joi');

const CreateOrderSchema = Joi.object({
    productList: Joi.array().items(Joi.string()),
    address: Joi.object({
        city: Joi.string().required(),
        country: Joi.string().required(),
        place: Joi.string().required(),
        street: Joi.string().required(),
        block: Joi.string().allow(''),
        building: Joi.string().required(),
        flat: Joi.string().required(),
    })
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

const validateCreateOrderMiddleware = async (req, res, next) => {
    try {
        await validate(CreateOrderSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}


module.exports = {
    validateCreateOrderMiddleware,
}
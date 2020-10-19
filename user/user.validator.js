const Joi = require('joi');

const CreateUserSchema = Joi.object({
    name: Joi
            .string()
            .min(2)
            .max(20)
            .allow('')
            .alphanum(),

    surname: Joi
        .string()
        .min(2)
        .max(20)
        .allow('')
        .alphanum(),

    phone: Joi
        .string()
        .min(12)
        .max(13)
        .allow(''),

    email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'ua'] } })
            .required(),
    
    password: Joi
            .string()
            .pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))
            .required(),

})

const UpdateUserAddressSchema = Joi.object({
    city: Joi.string().required().allow(''),
    country: Joi.string().required().allow(''),
    place: Joi.string().required().allow(''),
    street: Joi.string().required().allow(''),
    block: Joi.string().allow(''),
    building: Joi.string().required().allow(''),
    flat: Joi.string().required().allow(''),
    zip: Joi.string().required().allow(''),
})

const UpdateUserSchema = Joi.object({
    name: Joi
            .string()
            .min(2)
            .max(20)
            .alphanum(),

    surname: Joi
        .string()
        .min(2)
        .max(20)
        .alphanum(),

    phone: Joi
        .string()
        .min(12)
        .max(13),

    email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ru', 'ua'] } })
})

const ChangePasswordSchema = Joi.object({
    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))
        .required(),

    confirmPassword: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))
        .required(),
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

const validateCreateUserMiddleware = async (req, res, next) => {
    try {
        await validate(CreateUserSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}

const validateUpdateUserMiddleware = async (req, res, next) => {
    try {
        await validate(UpdateUserSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}

const validateChangePasswordMiddleware = async (req, res, next) => {
    try {
        await validate(ChangePasswordSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}

const validateUpdateAddressMiddleware = async (req, res, next) => {
    try {
        await validate(UpdateUserAddressSchema, req.body);
        next()
    } catch (e) {
        res.status(400).send(e.message)
        return res.end();
    }
}


module.exports = {
    validateCreateUserMiddleware,
    validateUpdateUserMiddleware,
    validateChangePasswordMiddleware,
    validateUpdateAddressMiddleware,
}
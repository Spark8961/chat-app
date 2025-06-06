import Joi from "joi";

export const createValidator = Joi.object({
    name: Joi.string().required(),
}).unknown(false);

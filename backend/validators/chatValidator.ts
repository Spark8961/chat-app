import Joi from "joi";

export const createDMValidator = Joi.object({
    userId: Joi.string().required(),
}).unknown(false);

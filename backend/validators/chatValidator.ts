import Joi from "joi";

export const createValidator = Joi.object({
    name: Joi.string().required(),
}).unknown(false);

export const joinValidator = Joi.object({
    chat_id: Joi.string().required(),
}).unknown(false);

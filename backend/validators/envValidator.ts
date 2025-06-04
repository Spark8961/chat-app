import Joi from "joi";

export const envValidator = Joi.object({
    MONGO_URI: Joi.string().required(),
    SERVER_PORT: Joi.number().required(),
    TOKEN_SECRET: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
});

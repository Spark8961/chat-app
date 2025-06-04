import dotenv from "dotenv";

import { envValidator } from "./validators/envValidator";

dotenv.config();

interface EnvVars {
    MONGO_URI: string;
    SERVER_PORT: number;
    TOKEN_SECRET: string;
    FRONTEND_URL: string;
}

const { error, value } = envValidator.validate(process.env, { abortEarly: false, stripUnknown: true });

if (error) throw new Error(error.message);

export const env: EnvVars = value;

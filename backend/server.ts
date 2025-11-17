import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config";
const { MONGO_URI, SERVER_PORT } = env;

import { authRouter, chatRouter } from "./routes/index";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB Connected.");
        app.listen(env.SERVER_PORT, () => {
            console.log(`Server running on ${SERVER_PORT}`);
        });
    } catch (error) {
        console.log(`Error starting server: \n ${error}`);
        process.exit(1);
    }
})();

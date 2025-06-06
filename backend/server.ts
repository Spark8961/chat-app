import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config";
const { FRONTEND_URL, MONGO_URI, SERVER_PORT } = env;

import { authRouter, chatRouter } from "./routes/index";

//TODO Setup Websockets
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(env.SERVER_PORT, () => {
            console.log(`Server running on ${SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

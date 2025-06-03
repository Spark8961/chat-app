import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { authRouter, chatRouter } from "./routes/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server running on ${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

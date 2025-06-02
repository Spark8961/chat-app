import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);

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

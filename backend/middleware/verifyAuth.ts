import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { env } from "../config";
const { TOKEN_SECRET } = env;

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: "Unauthorized: No token" });
        return;
    }

    try {
        const user = jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload;
        req.user = {
            userId: user._id,
            username: user.username,
        };
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: "Invalid or expired token" });
        return;
    }
};

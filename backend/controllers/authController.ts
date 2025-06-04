import { Request, Response } from "express";

import { findUserByEmail, authenticateUser, registerUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email, true);
        if (!user || !("password" in user)) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }

        const token = await authenticateUser(user, password);
        if (!token) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }

        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" })
            .json({ success: true, message: "Login success." });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        res.status(200)
            .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0 })
            .json({ message: "Logout Success" });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};

export const register = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const oldUser = await findUserByEmail(email);
        if (oldUser) {
            res.status(409).json({ error: "This email is already registered." });
            return;
        }

        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};

export const verifyMe = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ authenticated: true });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};

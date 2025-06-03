import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (await User.findOne({ email: email })) {
            return res.status(409).json({ error: "This email is already registered." });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username: username, email: email, password: hash });
        let newUser = await user.save();

        newUser = newUser.toObject();
        delete newUser.password;
        return res.status(201).json(newUser);
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(404).json({ error: "Invalid credentials." });
        }

        const payload = {
            userID: user._id,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);

        return res
            .status(200)
            .cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" })
            .json({ success: true, message: "Login success." });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0 })
            .json({ message: "Logout Success" });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const verifyMe = async (req, res) => {
    try {
        return res.status(200).json({ authenticated: true, user: req.user });
    } catch (err) {
        if (process.env.NODE_ENV !== "production") console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

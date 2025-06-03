import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/index.js";

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
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

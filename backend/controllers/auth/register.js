import { User } from "../../models/index.js";

import bcrypt from "bcrypt";

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
        console.log(err);
        return res.status(500).json({ error: "Internal server error." });
    }
};

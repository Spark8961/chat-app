import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, IUser } from "../models";
import { env } from "../config";
const { TOKEN_SECRET } = env;

type NoPassUser = Omit<IUser, "password">;
type NewUser = Omit<IUser, "_id">;

export const findUserByEmail = async (email: string, inclPass: boolean = false): Promise<IUser | NoPassUser | null> => {
    const select = inclPass ? "+password" : "-password";
    let user = await User.findOne({ email: email }).select(select).lean<IUser>();
    if (user && !inclPass) {
        const { password, ...cleanuser } = user;
        return cleanuser as NoPassUser;
    }
    return user;
};

export const findUserByID = async (id: string): Promise<NoPassUser | null> => {
    let user = await User.findOne({ _id: id }).select("-password").lean<NoPassUser>();
    return user;
};

export const authenticateUser = async (user: IUser, password: string): Promise<string | null> => {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    const token = jwt.sign(user, TOKEN_SECRET);
    return token;
};

export const registerUser = async (userDetails: NewUser): Promise<NoPassUser> => {
    const hash = await bcrypt.hash(userDetails.password, 10);
    const user = new User({ username: userDetails.username, email: userDetails.email, password: hash });
    const newUser = await user.save();
    const newUserObj = newUser.toObject();
    const { password, __v, ...addedUser } = newUserObj;
    return addedUser as NoPassUser;
};

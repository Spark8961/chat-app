import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    chats: [mongoose.Schema.Types.ObjectId],
});

export const User = mongoose.model("User", userSchema);

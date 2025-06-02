import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
});

export default mongoose.model("User", userSchema);

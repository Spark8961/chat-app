import mongoose, { InferSchemaType, Types } from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false, required: true },
    dms: { type: [mongoose.Schema.Types.ObjectId], default: [], required: true },
});

export const User = mongoose.model("User", UserSchema);
export type IUser = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };

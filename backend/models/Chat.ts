import mongoose, { InferSchemaType, Types } from "mongoose";

const ChatSchema = new mongoose.Schema({
    name: String,
    users: [mongoose.Schema.Types.ObjectId],
    owner: mongoose.Schema.Types.ObjectId,
    messages: [mongoose.Schema.Types.ObjectId],
});

export const Chat = mongoose.model("Chat", ChatSchema);
export type IChat = InferSchemaType<typeof ChatSchema> & { _id: Types.ObjectId };

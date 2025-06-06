import mongoose, { InferSchemaType, Types } from "mongoose";

const ChatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: { type: [mongoose.Schema.Types.ObjectId], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    messages: { type: [mongoose.Schema.Types.ObjectId], default: [], required: true },
});

export const Chat = mongoose.model("Chat", ChatSchema);
export type IChat = InferSchemaType<typeof ChatSchema> & { _id: Types.ObjectId };

import { Types, Schema, model } from "mongoose";
import { IChat } from "../interface/interface";

const chatSchema = new Schema<IChat>(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    conversation: [
      {
        message: { type: String, required: [true, "message is required"] },
        sender: { type: String, required: [true, "sender is required"] },
        time:{type:Date ,default:Date.now()}
      },
    ],
  }
);

export default model<IChat>("chat", chatSchema);

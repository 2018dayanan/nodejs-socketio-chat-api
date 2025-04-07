import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    message: {
        type: String,
        require: true
    }

}, { timestamps: true });
const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
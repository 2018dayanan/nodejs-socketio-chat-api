import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            require: true,
        }
    ]
}, { timestamps: true });
const conversationModel = mongoose.model("Conversation", ConversationSchema);
export default conversationModel;
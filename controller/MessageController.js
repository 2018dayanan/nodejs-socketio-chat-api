import conversationModel from "../model/conversationModel.js";
import MessageModel from "../model/messageModel.js";

export const CreateMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        if (!senderId || !receiverId || !message) {
            return res.status(400).json({
                success: false,
                message: `${!senderId ? "Sender Id" : !receiverId ? "Receiver Id" : "Message"} is required.`
            })
        }

        const newMessage = new MessageModel({
            userId: senderId,
            message
        });

        // Save the new message to the database
        const savedMessage = await newMessage.save();

        let conversation = await conversationModel.findOne({
            members: {
                $all: [senderId, receiverId],
                $size: 2
            }
        });

        if (conversation) {
            // If the conversation exists, update it by adding the new message's ID
            conversation = await conversationModel.findByIdAndUpdate(
                conversation._id,
                {
                    $push: {
                        messages: [savedMessage._id]
                    }
                },
                { new: true }
            );
        } else {
            // If the conversation doesn't exist, create a new conversation
            conversation = new conversationModel({
                members: [senderId, receiverId],
                messages: [savedMessage._id]
            });
            await conversation.save();
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: {
                newMessage: savedMessage,
                conversation: conversation
            }
        });

    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
// Get Messages
export const GetMessage = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        if (!senderId || !receiverId) {
            return res.status(400).json({
                success: false,
                message: `${!senderId ? "Sender Id" : !receiverId ? "Receiver Id" : ""} is required.`
            })
        }
        const conversation = await conversationModel.findOne({
            members: {
                $all: [senderId, receiverId],
                $size: 2
            }
        }).populate("messages");
        if (!conversation) {
            const newConversation = new conversationModel({

                members: [senderId, receiverId],
                message: []
            })
            await newConversation.save()
            return res.status(200).json({
                success: true,
                message: "Conversation Created",
                data: newConversation
            })
        }

        return res.status(200).json({
            status: true,
            message: "Successfully fetched message!",
            data: conversation.messages
        })
    } catch (e) {
        console.log("Error: ", e);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        })

    }

}
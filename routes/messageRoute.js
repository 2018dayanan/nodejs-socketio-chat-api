import express from 'express';
import { CreateMessage, GetMessage } from '../controller/MessageController.js';
const MessageRoutes = express.Router();

MessageRoutes.post("/create-message", CreateMessage)
MessageRoutes.post("/get-message", GetMessage)

export default MessageRoutes;
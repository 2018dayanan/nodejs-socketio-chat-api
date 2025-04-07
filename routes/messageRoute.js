import express from 'express';
import { CreateMessage } from '../controller/MessageController.js';
const MessageRoutes = express.Router();

MessageRoutes.post("/create-message", CreateMessage)

export default MessageRoutes;
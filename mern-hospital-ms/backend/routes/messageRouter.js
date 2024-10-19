import express from 'express'
import { getAllMessages, sendMessage } from '../controllers/message-controller.js';
import {isAdminAuthenticated} from '../middleware/auth.js'
const messageRouter = express.Router();

messageRouter.post('/send', sendMessage)
messageRouter.get('/allMessages', isAdminAuthenticated, getAllMessages)


export default messageRouter;
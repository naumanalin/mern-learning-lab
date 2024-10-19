import messageModel from '../models/messageSchema.js';
import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js'
import ErrorHandler from '../middleware/errorMiddleware.js';

// controllers: sendMessage, getAllMessages

export const sendMessage = catchAsyncErrors( async (req, res, next)=>{
    const {firstName, lastName, phone, email, message} = req.body;

    if(!firstName || !lastName || !email || !phone || !message){
        return next(new ErrorHandler("Please Fill All Required Fields", 400))
    }

    const newMessage = await messageModel.create({ firstName, lastName, phone, email, message });
    res.status(201).json({
        success: true,
        message:"Your Message Send Successfully",
        new: newMessage
    })
}) 


export const getAllMessages = catchAsyncErrors(async(req, res, next)=>{
    const messages = await messageModel.find()
    res.status(200).json({
        success: true,
        messages
    })
})
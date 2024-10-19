import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import { dbConnection } from './models/dbConnection.js'
import {errorMiddleware} from './middleware/errorMiddleware.js'

import messageRouter from './routes/messageRouter.js'
import userRouter from './routes/userRouter.js'
import appointmentRouter from './routes/appointmentRouter.js'

const app = express()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// ------ dotenv ------
const PORT = process.env.PORT
const frontend = process.env.FRONTEND_URL
const dashboard = process.env.DASHBOARD_URL


app.use(cors({
    origin:[frontend, dashboard],
    methods:["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))


// All Routes
app.get('/', (req, res)=>{
    res.json({success:true, message:"project: hospital MS",
        endpoints:{
            Messages:{
                send:"http://localhost:8000/api/message/send",
                getAllMessages:"http://localhost:8000/api/message/"
            },
            FrontEnd:{
                home:"http://localhost:8000/api/message/ "
            },
            DashBoard:{
                admin:'http://localhost:8000/api/message/ '
            }
        }
    })
})

app.use('/api/message', messageRouter)
app.use('/api/user', userRouter)
app.use('/api/appointment', appointmentRouter)


dbConnection();
app.use(errorMiddleware);

app.listen(PORT, ()=>{console.log(`SERVER IS LIVE AT PORT: ${PORT}`)})
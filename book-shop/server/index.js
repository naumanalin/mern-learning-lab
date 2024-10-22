import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'


const app = express()

import bookRoutes from './Routes/book.routes.js';
import userRoutes from './Routes/user.routes.js'


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:true}))

dotenv.config();
const PORT = process.env.PORT || 8080;
const URI = process.env.MongoDB_URI;


// connect to mongoDB
try {
    mongoose.connect(URI);
    console.log("MongoDB is Connected");
} catch (error) {
    console.log("MongoDB Error: ", error);
}



// Routes
app.get('/', (req, res)=>{
    res.json({success:true, message:"hello word"})
})


app.use('/books', bookRoutes)
app.use('/user', userRoutes)



// app.listen(PORT, ()=>console.log(`SERVER is live at Port: ${PORT}`))

module.exports = app;

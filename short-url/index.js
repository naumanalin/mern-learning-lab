const express = require('express')
const app = express();
const port = 8000;

import { connectTOMongoDB } from './connect';

connectTOMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB is Connected at Prot: 27017"))
.catch((error)=> console.log("MongoDB is not Connected error:" + error))


app.get('/', (req, res)=>{
    res.send('hello ha j, express')
})


// url Router
const urlRoute = require("./routes/url");

app.use("/url", urlRoute);




app.listen(port, ()=>console.log(`server is runing at port: ${port}`))




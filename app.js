const express = require('express');
const userRoute = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoute");

require('dotenv').config();


const app = express()



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute);
app.use("/blog", blogRoute);


app.get("/", (req, res)=>{
    res.send("i am working")
})




module.exports = app;
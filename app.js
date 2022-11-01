const express = require('express');
const {connectmongodb} = require('./database/database');
const userRoute = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoute");

require('dotenv').config();

const PORT = process.env.PORT
const app = express()
connectmongodb()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRoute);
app.use("/blog", blogRoute);


app.get("/", (req, res)=>{
    res.send("i am working")
})





app.listen(PORT, ()=>{
    console.log(`listening at ${PORT}`)
})
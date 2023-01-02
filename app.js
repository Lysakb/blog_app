const express = require('express');
const rateLimit = require("express-rate-limit");
const userRoute = require("./Routes/userRoute");
const blogRoute = require("./Routes/blogRoute");

require('dotenv').config();


const app = express()

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 15 minutes
	max: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

app.use('/user', userRoute);
app.use("/blog", blogRoute);


app.get("/", (req, res)=>{
    res.send("i am working")
})




module.exports = app;
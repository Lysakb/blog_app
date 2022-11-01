const jwt = require('jsonwebtoken');
const userModel = require("../model/userModel");
require("dotenv").config();

const userAuthenticate = async(req, res, next)=>{
    let token 

    if(req.headers.authrorization && req.headers.authroization.startsWith('Bearer')){
        try{
            token = req.headers.authrorization.split(" ")[1]

            const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)

            req.user = await user.findById(verifiedToken.id)
            next()
        }catch(error){
            res.status(401).send('Not authorized')
        }
    }
    if(!token){
        res.status(401).send('No token!')
    }
}




module.exports = userAuthenticate;

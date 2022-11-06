const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

// code for registering the user import to the route and to the app.js

const userSignup = async(req, res) =>{
    const {first_name, last_name, email, password} = req.body

    if(!first_name & !last_name & !email & !password){
        return res.status(400).send({message:"Please fill in the field"})
    }

    try{
        const user = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
        res.status(200).send({message: "user created successfully!", user})
    }
    catch(error){
        res.send(error)
    }
};

const userLogin = async(req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email})

        if (!user){
            return res.status(400).send({message:"User not found! please register"})
        }

        const validateUser = await bcrypt.compare(password, user.password)

        if(!validateUser){
            return res.status(400).send({message: "Incorrect password"})
        }

        const userId = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(userId, process.env.SECRET_TOKEN, {expiresIn: '1h'} )



        return res.status(200).send({message: "Login successful!", token})

    }catch(error){
        res.send(error)
    }
}

module.exports = {userSignup, userLogin};
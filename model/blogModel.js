const express = require('express');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,    
    },

    description:{
        type: String,
    },

    author:{
        type: String,
    },

    state:{
         type: String, 
         default: "draft", enum: ["draft", "published"]
    },
    read_count:{
        type: Number
    },
    reading_time:{
        type: Number
    },
    tags:{
        type: String
    },
    body:{
        type: String,
        required: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },   
},

    {timestamp: true}
)


const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
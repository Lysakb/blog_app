
const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2")
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
        type: Number,
        default: 0
    },
    reading_time:{
        type: String
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
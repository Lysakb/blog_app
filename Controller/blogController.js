const userModel = require('../model/userModel');
const blogModel = require('../model/blogModel');
const jwt = require("jsonwebtoken");
const {readingTime} = require('../helper/helper');
require("dotenv").config();


const createBlog = async(req, res, next)=>{
    const {title, description, author, tags, body} = req.body;

        if(!title & !description & !author & !tags & !body){
            res.status(400).send({message:"Please fill in the field"})
        }
    try{
        const userBlog = await userModel.findById(req.user._id);
            
            const blog = new blogModel({
                title: title,
                description: description,
                author: `${userBlog.first_name} ${userBlog.last_name}`,
                tags: tags,
                body: body,
                reading_time: readingTime(body),
                user: userBlog._id,
        })

        const saveBlog = await blog.save();

        userBlog.article = userBlog.article.concat(saveBlog._id);
        await userBlog.save();

        res.status(200).send({ message: 'Blog is created Succesfully'});
    }catch(error){
        next(error)
    }
}

const getBlogById = async (req, res, next) => {
        const id = req.params.id;

    try {
        const blog = await blogModel.findById(id)
        // .where({ State: 'published' });

        if (!blog)
            return res.status(400).send({ message: 'No blog!' });

        // singleBlog.Read_Count++;
        const saveBlog = await blog.save();

        res.status(200).send(blog);
    } catch (error) {
        next(error);
    }
};



module.exports = {createBlog}
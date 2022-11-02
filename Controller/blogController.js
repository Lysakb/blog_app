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

const getAllBlogs = async (req, res, next) => {
    try {
        //pagination
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 20;
        // search by title, author and tags
        let search = {};
        if (req.query.author) {
            search = { Author: req.query.author };
        } else if (req.query.title) {
            search = { Title: req.query.title };
        } else if (req.query.tag) {
            search = { Tags: req.query.tag };
        }

        // getting al blogs from the database
        const blogs = await blogModel
            .find(search)
            .where({ State: 'published' })
            .sort({ Reading_Time: 1, Read_Count: -1, timestamps: -1 })
            .skip(page * limit)
            .limit(limit);

        const count = await blogModel.countDocuments();

        if (blogs) {
            res.status(200).send({
                message: blogs,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {createBlog}
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
        res.status(400).send(error.message)
    }
}

const getBlog = async(req, res, next)=>{
    
    try{
        const blog = await blogModel.find().where({ state: 'published' })
       
        if(!blog){
            res.status(404).send({message:"No blog found!"})
        }

        res.status(200).send(blog);

    }
    
    catch(error){
        res.status(400).send(error.message)
    }
    
}


const getBlogById = async (req, res, next) => {
        const id = req.params.id;

    try {
        const blog = await blogModel.findById(id).where({ state: 'published' }).populate("user");

        if (!blog)
            return res.status(400).send({ message: 'No blog!' });

        blog.read_count++;
        const saveBlog = await blog.save();

        res.status(200).send(saveBlog);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const updateBlogById = async (req, res, next) => {
    const id = req.params.id;
    const user = req.user;
    const {title, description, state, tags, body} = req.body;

    try {
    
        const blog = await blogModel.findById(id);

        if (user.id === blog.user.toString()) {
            const blogUpdate = await blogModel.findByIdAndUpdate(id, 
                {
                    $set: {
                        state: state,
                        title: title,
                        description: description,
                        body: body,
                        tags: tags,
                    },
                },
                {
                    new: true,
                }
            );

            res.status(200).send(blogUpdate);
        } else {
            res.status(400).send({ message: 'You are not authorized!' });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const deleteBlogById = async (req, res, next) => {
    const id = req.params.id;
    const user = req.user
    try {
        const blog = await blogModel.findById(id);

        const user = await userModel.findById(id);

        if (user.id === blog.user._id.toString()) {
        const blogDelete = await blogModel.findByIdAndDelete(id);

        const index = user.article.indexOf(id);
        if(index !== -1){
            user.article.splice(index, 1);
            await user.save();

            await userBlog.save();

            
        return res.status(201).send({ message: 'Deleted successfully' });
        }
       


        } else {
            res.status(400).send({ message: 'You are not authorized' });
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
};


const blogByUser = async (req, res, next) => {
    try {
        const user = req.user;

        const blogUser = await userModel.findById(user.id);

        res.status(200).send(blogUser);
    } catch (error) {
        res.status(400).send(error.message)
    }
};


module.exports = {createBlog, getBlog, getBlogById, updateBlogById, deleteBlogById, blogByUser}
const express = require('express');
const blogModel = require('../model/blogModel');
const blogRoute = express.Router();

blogRoute.get('/', async (req, res)=>{
    const blog = await blogModel.find()
    res.status(200).send(blog)
})


blogRoute.post('/', async(req, res, next)=>{
    const { title, description, author, body, tags} = req.body;

    if (!title || !description || !author || !body || !tags) {
        return res.status(400).send({ message: 'Please fill in the field' });
    }

   try{
    const blog = await blogModel.create({
        title: title,
        description: description,
        author: author,
        body: body,
        tags: tags
        
    })
    res.status(201).send(
        {message: "Blog was created successfully!", blog},
    
        )
   }catch(error){
    next(error)
   }

    });

    blogRoute.get("/:id", async (req, res, next)=>{
        const id = req.params.id
        try{
            const blog = await blogModel.findById(id);
            res.status(200).send(blog)
        }
        catch(error){
            next(error)
        }
        
       
    })



module.exports = blogRoute
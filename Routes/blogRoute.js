const express = require('express');
const blogModel = require('../model/blogModel');
const blogRoute = express.Router();
const userAuthenticate = require('../Middleware/userAuthenticate');
const {createBlog, getBlog, getBlogById ,updateBlogById, deleteBlogById, blogByUser} = require('../Controller/blogController');


blogRoute.post('/create', userAuthenticate, createBlog);
blogRoute.get('/get', getBlog);
blogRoute.get('/get/:id', getBlogById);
blogRoute.put('/update/:id', userAuthenticate, updateBlogById);
blogRoute.delete('/delete/:id', userAuthenticate, deleteBlogById);
blogRoute.get('/:id', blogByUser)


module.exports = blogRoute;
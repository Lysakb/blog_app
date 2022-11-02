const express = require('express');
const blogModel = require('../model/blogModel');
const blogRoute = express.Router();
const userAuthenticate = require('../Middleware/userAuthenticate');
const {createBlog} = require('../Controller/blogController');


blogRoute.post('/createBlog', userAuthenticate, createBlog);


module.exports = blogRoute;
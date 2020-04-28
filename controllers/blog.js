const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const blog = await new Blog(req.body).save();
  res.status(201).json(blog);
});

module.exports = blogRouter;

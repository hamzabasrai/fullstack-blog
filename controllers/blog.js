const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((error) => {
      next(error);
    });
});

blogRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter;

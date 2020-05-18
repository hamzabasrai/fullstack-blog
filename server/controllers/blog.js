const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await new Blog({ ...req.body, user: user._id }).save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  const populatedBlog = await blog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();
  res.status(201).json(populatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  const blogToDelete = await Blog.findById(req.params.id);
  if (blogToDelete === null) {
    // Non-existing ID
    return res.status(204).end();
  } else if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
    return res
      .status(401)
      .json({ error: 'Blog can only be deleted by creator' });
  }
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    comments: req.body.comments,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });

  res.json(updatedBlog);
});

blogRouter.post('/:id/comments', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const blogToUpdate = await Blog.findById(req.params.id);
  blogToUpdate.comments = blogToUpdate.comments.concat(req.body.comment);
  const updatedBlog = await blogToUpdate.save();

  const populatedBlog = await updatedBlog
    .populate('user', { username: 1, name: 1 })
    .execPopulate();
  res.status(201).json(populatedBlog);
});

module.exports = blogRouter;

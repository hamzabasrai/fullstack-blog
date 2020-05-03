const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'HTML is Easy',
    author: 'Randy Jackson',
    url: 'http://mytestblog.com/1',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
  },
  {
    title: 'Clean Code is Key',
    author: 'Robert C. Martin',
    url: 'http://mytestblog.com/902',
    likes: 9,
  },
];

const nonExistingId = () => {
  const blog = new Blog({
    title: 'New Blog',
    author: 'New Author',
    url: 'http://mytestblog.com/808',
    likes: 9,
  });

  return blog._id.toString();
};

const blogsinDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const invalidUserToken = () => {
  return jwt.sign('badtoken', process.env.SECRET);
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsinDb,
  usersInDb,
  invalidUserToken,
};

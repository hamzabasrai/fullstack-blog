const Blog = require('../models/blog');

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'New Blog',
    author: 'New Author',
    url: 'http://mytestblog.com/808',
    likes: 9,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsinDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsinDb,
};

const logger = require('../utils/logger');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  const blogLikes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...blogLikes);
  const index = blogLikes.indexOf(mostLikes);
  const favourite = blogs[index];
  
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

module.exports = { dummy, totalLikes, favouriteBlog };

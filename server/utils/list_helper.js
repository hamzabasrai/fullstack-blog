const _ = require('lodash');
const logger = require('../utils/logger');

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const dict = _.groupBy(blogs, 'author');
  const author = _.max(Object.keys(dict));
  const number = dict[author].length;
  return { author, blogs: number };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const dict = _.groupBy(blogs, 'author');
  const likeMap = Object.keys(dict).map((author) => {
    const blogList = dict[author];
    return { author: author, likes: totalLikes(blogList) };
  });
  return _.maxBy(likeMap, 'likes');
};

module.exports = { totalLikes, favouriteBlog, mostBlogs, mostLikes };

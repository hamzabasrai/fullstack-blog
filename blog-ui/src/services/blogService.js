import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = {};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog) => {
  const updatedBlog = {
    id: blog.id,
    user: blog.user.id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments,
  };
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const remove = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const createComment = async (blogId, comment) => {
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comment },
    config
  );
  return response.data;
};

export default { getAll, create, update, remove, createComment, setToken };

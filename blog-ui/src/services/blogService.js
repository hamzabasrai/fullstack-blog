import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedBlog = {
    id: blog.id,
    user: blog.user.id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes,
  };
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

export default { getAll, create, update, setToken };

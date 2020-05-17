import blogService from '../services/blogService';

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'CREATE_BLOG':
      return state.concat(action.data);

    case 'UPDATE_BLOG':
      const updatedBlog = action.data;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );

    case 'DELETE_BLOG':
      const deletedID = action.data;
      return state.filter((blog) => blog.id !== deletedID);

    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({ type: 'INIT_BLOGS', data: blogs });
      return Promise.reselove(blogs);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({ type: 'CREATE_BLOG', data: blog });
      return Promise.resolve(newBlog);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog);
      dispatch({ type: 'UPDATE_BLOG', data: updatedBlog });
      return Promise.resolve(updatedBlog);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({ type: 'DELETE_BLOG', data: id });
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };
};

export default blogReducer;

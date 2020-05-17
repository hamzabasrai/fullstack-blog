import loginService from '../services/loginService';
import blogService from '../services/blogService';
import userService from '../services/userService';

const initialState = { currentUser: null, allUsers: [] };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return { ...state, allUsers: action.data };

    case 'LOGIN':
      return { ...state, currentUser: action.data };

    case 'LOGOUT':
      return { ...state, currentUser: null };

    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('currentUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'LOGIN',
        data: user,
      });
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('currentUser');
    blogService.setToken(null);
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const getUser = () => {
  return (dispatch) => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      blogService.setToken(user.token);
      dispatch({ type: 'LOGIN', data: user });
    }
  };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({ type: 'INIT_USERS', data: users });
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export default userReducer;

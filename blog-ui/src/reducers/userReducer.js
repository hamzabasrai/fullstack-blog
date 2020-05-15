import loginService from '../services/loginService';
import blogService from '../services/blogService';

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;

    case 'LOGOUT':
      return null;

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
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILED',
        data: 'Invalid credentials',
      });
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

export default userReducer;

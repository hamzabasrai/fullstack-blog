import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer, { getUser, initializeUsers } from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import blogReducer, { initializeBlogs } from './reducers/blogReducer';

const reducer = combineReducers({
  users: userReducer,
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(initializeBlogs());
store.dispatch(initializeUsers());
store.dispatch(getUser());

export default store;

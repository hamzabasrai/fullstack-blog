import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer, { getUser } from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import blogReducer, { initializeBlogs } from './reducers/blogReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(getUser());
store.dispatch(initializeBlogs());

export default store;

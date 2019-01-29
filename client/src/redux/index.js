import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ShareItemReducer from './modules/ShareItem';

const middleware = [];

const store = createStore(
  combineReducers({ shareItemPreview: ShareItemReducer }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

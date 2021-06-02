import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index.js';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
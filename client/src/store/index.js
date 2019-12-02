import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from 'react-router-redux';
import { history } from '../history';

import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

// TODO: Add loading of initial state from cookie
// import { loadState } from '../localStorage';
// const persistedState = loadState();

const store = createStore(reducers(history), applyMiddleware(reduxThunk, routerMiddleware(history)));

export default store;

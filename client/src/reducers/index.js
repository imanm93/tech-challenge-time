import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import timerReducer from './timerReducer';
import viewReducer from './viewReducer';

const rootReducer = (history) => combineReducers({
  form: formReducer,
  user: userReducer,
  view: viewReducer,
  sessions: timerReducer,
  router: connectRouter(history)
});

export default rootReducer;

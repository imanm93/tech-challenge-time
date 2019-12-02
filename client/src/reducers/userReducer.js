import { SET_USER, SET_LOGIN_ERROR } from '../constants/user/reducerTypes';

const initState = {
  isLoggedIn: false,
  username: '',
  refresh_token: ''
}

export default function (state=initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...{ isLoggedIn: true, username: action.data.username, refresh_token: action.data.refresh } };
    case SET_LOGIN_ERROR:
      return { ...state, ...{ error: action.data } }
    default:
      return state;
  }
}

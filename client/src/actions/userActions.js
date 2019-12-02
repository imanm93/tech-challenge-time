/**
 * User Actions
 * @desc All actions associated with the user's account
 */
import axios from '../utils/axios';
import { LOGIN_URL, REGISTER_URL } from '../constants/user/endpoints';
import { SET_USER, SET_LOGIN_ERROR } from '../constants/user/reducerTypes';

/**
 * Get authentication token for user
 * @param { username, password }
 */
export function postLoginUser(data, callback) {
  return function (dispatch) {
    delete data['type']
    axios.post(LOGIN_URL, data)
      .then(response => {
        dispatch({ type: SET_USER, data: response.data.user })
        axios.defaults.headers = Object.assign({}, axios.defaults.headers,
          { 'Authorization': `Bearer ${response.data.user.token}` }
        );
        callback()
      })
      .catch(err => {
        dispatch({ type: SET_LOGIN_ERROR, data: '*Invalid username or password, please try again!' })
      });
  }
}

/**
 * Register user
 * @param { username, password }
 */
export function postRegisterUser(data, callback) {
  return function (dispatch) {
    delete data['type']
    axios.post(REGISTER_URL, data)
      .then(response => {
        callback(data);
      })
      .catch(err => {
        if (err.response.data.message) dispatch({ type: SET_LOGIN_ERROR, data: '*' + err.response.data.message })
      });
  }
}

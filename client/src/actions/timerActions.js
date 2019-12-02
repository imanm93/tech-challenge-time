/**
 * User Actions
 * @desc All actions associated with the timer
 */
import axios from '../utils/axios';
import { NEW_TIMER_SESSION_URL, TIMER_SESSIONS_URL } from '../constants/timer/endpoints';
import { SET_TIMER_SESSIONS, SET_TIMER_SESSIONS_VIEW_DATE } from '../constants/timer/reducerTypes';

/**
 * Save new timer session
 * @param { name, username, time, createdAt }
 */
export function postNewTimerSession(data, callback) {
 return function (dispatch) {
   axios.post(NEW_TIMER_SESSION_URL, data)
    .then(response => {
      callback();
    })
    .catch(err => {
      console.log(err);
    })
 }
}

 /**
  * Get all timer session for an user
  * @param { username }
  */
export function getTimerSessions(data) {
  return function (dispatch) {
    axios.get(TIMER_SESSIONS_URL + '/' + data)
     .then(response => {
       dispatch({ type: SET_TIMER_SESSIONS, data: response.data.data })
     })
     .catch(err => {
       console.log(err);
     })
  }
}

/**
 * Set date to render timer sessions overview
 * @param { date }
 */
export function setTimerSessionViewDate(data) {
  return function (dispatch) {
    dispatch({ type: SET_TIMER_SESSIONS_VIEW_DATE, data: data })
  }
}

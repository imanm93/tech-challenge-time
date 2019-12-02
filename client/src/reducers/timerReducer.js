import { SET_TIMER_SESSIONS, SET_TIMER_SESSIONS_VIEW_DATE } from '../constants/timer/reducerTypes';

const initState = {
  sessions: [],
  selectedDate: {}
}

export default function (state=initState, action) {
  switch (action.type) {
    case SET_TIMER_SESSIONS:
      return { ...state, ...{ sessions: action.data } };
    case SET_TIMER_SESSIONS_VIEW_DATE:
      return { ...state, ...{ selectedDate: action.data } };
    default:
      return state;
  }
}

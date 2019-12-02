import { SET_VIEW } from '../constants/view/reducerTypes';

const initState = {
  view: 'new'
}

export default function (state=initState, action) {
  switch (action.type) {
    case SET_VIEW:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

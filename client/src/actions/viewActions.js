/**
 * View Actions
 * @desc All actions associated with the portal view
 */
import { SET_VIEW } from '../constants/view/reducerTypes';

/**
 * Change View
 * @param { view }
 */
export function changeView(data) {
 return function (dispatch) {
   let newData = Object.assign({}, data);
   if (newData['view'] === 'new') { newData['view'] = 'view' }
   else { newData['view'] = 'new' }
   dispatch({ type: SET_VIEW, data: newData })
 }
}

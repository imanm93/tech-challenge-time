import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import { Provider } from 'react-redux';
import { history } from './history';

import * as serviceWorker from './serviceWorker';

store.subscribe(throttle(() => {
  saveState({
    user: store.getState().user
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store';

// store.dispatch({
//   type:' LOAD_SORT_BY',
//   payload : 'alphbet'

// })
//store.dispatch(setSortBy('numerical'))
//store.dispatch(setPenCategory(444))

// store.dispatch({
//   type:' LOAD_CATEGORY',
//   payload : 8

// })

ReactDOM.render(
  // <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);



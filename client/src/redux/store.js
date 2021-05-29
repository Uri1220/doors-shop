import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import {rootReducer} from './reducers'
import Cookie from 'js-cookie';

// const cartItems = Cookie.getJSON('cartItems') || [];
// const userInfo = Cookie.getJSON('userInfo') || null;

// const initialState = {
//   cart: { cartItems, shipping: {}, payment: {} },
//      userSignin: { userInfo },
// };

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    // paymentMethod: 'PayPal',
  },
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
   initialState,
  composeEnhancer(applyMiddleware(thunk))
);

// window.store=store;

export default store;
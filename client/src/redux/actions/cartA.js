import Axios from "axios";
// import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  // CART_SAVE_PAYMENT_METHOD,
  // CART_ADD_ITEM_FAIL,
}
  from "../constants/cartConstans";

  // const config = require('../../../../config')
  // const PORT = config.get('port') || 5000
  // const baseUrl = config.get('baseUrl') 


// const ddd = 'pens/'
const addToCart = (penId, qty, ur,sz,cl) => async (dispatch, getState) => {
  try {
    //  const { data } = await Axios.get('http://localhost:5000/doors/' + penId);
     const { data } = await Axios.get('http://localhost:5000/api/' + ur + penId);
    // const { data } = await Axios.get(baseUrl + 'api/' + PORT + ur + penId);
    //  console.log(data)
    //  console.log(data.url)
    //  console.log(data.color_id)
    // debugger
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.title,
        image: data.url,
        price: data.price,
        countInStock: data.countInStock,
        path: data.color_id,
        qty,
        sz,
        cl
      }
    });
    ///COOKIE
    // const { cart: { cartItems } } = getState();
    // Cookie.set("cartItems", JSON.stringify(cartItems));

    ////LOCALSTORAGE
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );

  } catch (error) {

  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  // Cookie.set("cartItems", JSON.stringify(cartItems));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}


 const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export { addToCart, removeFromCart ,saveShippingAddress}


//// асинх получаем  Один  ч-з thunk////////////
// export const fetchPenDetail = (penId) => async (dispatch) => {
//   try {
//      dispatch({ type: PEN_DETAILS_REQUEST, payload: penId })
//      await axios.get('http://localhost:5000/pens/' + penId)
//         .then(data => { dispatch({ type: PEN_DETAILS_SUCCESS, payload: data.data }) });

//   } catch (error) {
//      dispatch({ type: PEN_DETAILS_FAIL, payload: error.message })
//   }
// };


// export const savePaymentMethod = (data) => (dispatch) => {
//   dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
// };
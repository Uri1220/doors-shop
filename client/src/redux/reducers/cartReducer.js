import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY
} from "../constants/cartConstans";

function cartReducer(state = { cartItems: [], shippingAddress: {}, payment: {} }, action) {

  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      ////////////////Если повторно выбирать тот же прод
      ///кол-во изменяется на последнее
      const product = state.cartItems.find(x => x.productId === item.productId);
      // нашли совпадающий product
      if (product) {
        return {
          ...state,
          cartItems:
            state.cartItems.map(x => x.productId === product.productId ? item : x)
          //заменили старый на новый item иначе оставили старый x
        };
      }
       ////////// End Если повторно выбирать тот же прод

      return {...state, cartItems: [...state.cartItems, item] };

    case CART_REMOVE_ITEM:
      return { ...state,cartItems: state.cartItems.filter(x => x.productId !== action.payload) };

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };

    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case CART_EMPTY:
      return { ...state, error: '', cartItems: [] };

    default:
      return state
  }
}

export { cartReducer }
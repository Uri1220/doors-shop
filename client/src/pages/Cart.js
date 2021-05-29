import React from 'react'
import { addToCart, removeFromCart } from '../redux/actions/cartA';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/my/MessageBox';

function Cart(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();  

  const sz = props.location.search ? String(props.location.search.split("=")[1]) : 'no-size';
  const cl = props.location.search ? String(props.location.search.split("=")[3]) : '';

  const orderSumm = (cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2)

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }


  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>
              Корзина
          </h3>
            <div>
              Цена
          </div>
          </li>
          {cartItems.length === 0 ? (
            <MessageBox>
              В корзине нет товаров.
            </MessageBox>
          ) : (
              cartItems.map(item =>
                <li key={item.productId}>
                  <div className="cart-image">
                    <Link to={"/" + item.path + item.productId}>
                      <img src={item.image} alt="product" />
                    </Link>
                  </div>

                  <div className="cart-name">
                    <div>
                      <Link to={"/" + item.path + item.productId}>
                        {item.name}
                      </Link>

                    </div>
                    <div className="cart-quantity">
                      Количество:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value), item.path ,sz,cl))}>
                        {[...Array(item.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </select>

                      <button type="button" style={{marginLeft:10}} className="button"
                        onClick={() => removeFromCartHandler(item.productId)} >
                        Delete
                    </button>
                    </div>
                  </div>
                  <div className="cart-price">
                    {item.price} руб.
                  </div>
                </li>
              )
            )
          }
        </ul>

      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Стоимость заказа ({cartItems.reduce((a, c) => a + c.qty, 0)} единиц) на {orderSumm} руб.
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Оформить заказ
              </button>
            </li>
          </ul>
        </div>
      </div>
     

    </div>
  )
}

export default Cart

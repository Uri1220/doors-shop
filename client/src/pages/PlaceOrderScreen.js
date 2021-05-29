import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
// import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);

  // const { shipping } = cart;

  // console.log(shipping)

  //   if (!cart.paymentMethod) {
  //     props.history.push('/payment');
  //   }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  //добавляет в cart общую стоимость товара  itemsPrice
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  //   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  //   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  //   cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      alert('Ваш заказ принят')
      // props.history.push(`/order/${order._id}`);
      props.history.push(`/`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  //  debugger
  return (
    <div>
      {/* <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> */}
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Информация о покупателе:</h2>
                <p>

                  <strong>Имя:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Адрес: </strong> {cart.shippingAddress.address}<br />
                  <strong>Телефон: </strong>  {cart.shippingAddress.postalCode},


                </p>
              </div>
            </li>
            {/* <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li> */}
            <li>
              <div className="card card-body">
                <h2>Информация о товаре:</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.productId}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          {/* <Link to={`/product/${item.productId}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </div>

                        <div>
                          {item.qty} x {item.price} = {item.qty * item.price} руб.
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              {/* <li>
                <h2>Order Summary</h2>
              </li> */}
              <li>
                <div className="row">
                  <div>Сумма заказа</div>
                  <div>{cart.itemsPrice.toFixed(2)} руб.</div>
                </div>
              </li>
              {/* <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li> */}
              {/* <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li> */}
              {/* <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>  */}
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Разместить заказ
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
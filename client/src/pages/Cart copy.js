import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../redux/actions/cartA';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/my/MessageBox';
// import '../scss/Cart.scss'


// import ShippingAddressScreen from './ShippingAddressScreen';


function Cart(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const cat = useSelector(state => state.penFilters);
  const { category } = cat;
  // console.log('cat:',category);
  ////////////////////
  let ur = ''
  if (category === 2) {
    ur = 'pens/'
  } else if (category === 1) {
    ur = 'doors/'
  }
  else {
    ur = ''
  }
  //////////////// 
  //  console.log(ur); 


  const dispatch = useDispatch();

  const productId = props.match.params.id;
  //  const productId = props.match.url;
  // console.log('qty',props.match.url);

  // from DoorOne:
  // props.history.push('/cart/' + props.match.params.id + '?qty=' + qty + '=sz=' + sz + '=cl=' + cl);
   // console.log('props.location.search:', props.location.search);// ?qty=1=sz=200*60=cl=Без отделки (VG)

  //  props.location.search: ?qty=1=sz=200*60=cl=no-color
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const sz = props.location.search ? String(props.location.search.split("=")[3]) : 'no-size';
  const cl = props.location.search ? String(props.location.search.split("=")[5]) : '';
  // console.log('qty', qty);
  //  console.log('sz', sz);
    // console.log('cl', cl);

  const orderSumm = (cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2)
  //  console.log('prodId',orderSumm);
  // console.log('qty',qty);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    if (productId) {
      // dispatch(addToCart(productId, qty));
      dispatch(addToCart(productId, qty, ur , sz ,cl));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }
  // debugger
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
                  {/* path = doors/ из БД */}
                  <div className="cart-image">
                    <Link to={"/" + item.path + item.productId}>
                      <img src={item.image} alt="product" />
                    </Link>
                  </div>

                  <div className="cart-name">
                    <div>
                      <Link to={"/" + item.path + item.productId}>
                        {/* <Link to={"/pens/" + item.productId}> */}
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

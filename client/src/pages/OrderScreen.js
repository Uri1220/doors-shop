import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../redux/actions/orderActions'
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({ 

  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px',
    lineHeight: 1.5,
    borderColor: '#eee',
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },
  },
 
}));




function OrderScreen(props) {
  const classes = useStyles();

  // const [qty, setQty] = useState(1)
  //Получаю д отдельной ручки  из Redux Работает но картинка не грузится
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(detailsOrder(props.match.params.id))
  }, [])

  const orderDetail = useSelector(state => state.order)
  const { order, loading, error } = orderDetail;


  //  console.log("order", order)
  // console.log('isLoading', isLoading)
  // console.log('error', error)





  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      {/* <button onClick={props.history.goBack}>Back</button> */}
      <Button
       style={{ marginLeft: 10}}
        variant="contained"
        color="secondary"
        size="large"
        onClick={props.history.goBack}
        className={classes.button}
      >
        Назад
      </Button>



      <h1>Заказ от {order.orderDate}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Информация о покупателе:</h2>
                <p>
                  <strong>Имя:</strong> {order.shipping.fullName} <br />
                  <strong>Адрес: </strong> {order.shipping.address} <br />
                  <strong>Телефон: </strong> {order.shipping.postalCode}
                </p>
                {order.deliveredAt ? (
                  <MessageBox variant="success">
                    Доставлено: {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Не доставлено</MessageBox>
                )}
              </div>
            </li>

            <li>

              <div className="card card-body">
                <h2>Информация о товаре:</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          {/* <Link to={`/product/${item.product}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </div>
                        <div className="min-30">
                          {(item.cl !== 'undefined') ? item.cl : '--'}
                        </div>
                        <div className="min-30">
                          {(item.sz !== 'undefined') ? item.sz : '--'}
                        </div>

                        <div>
                          {item.qty} x {item.price}  = {item.qty * item.price} руб.
                </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>


      </div>
    </div>
  )
}

export default OrderScreen

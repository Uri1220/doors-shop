import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, detailsOrder, createOrder } from '../redux/actions/orderActions'
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({ 

  input: {
    width: '60ch',
    fontSize: 16,
    padding: ' 5px 0px',
    marginLeft: 15,
    '& .MuiInputBase-root ': {
      fontSize: 16,
    },
    '& .MuiFormLabel-root': {
      fontSize: 16,
    },

  },

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



function OrderDeliverScreen(props) {
  const classes = useStyles();

  const dispatch = useDispatch()

  const orderDetail = useSelector(state => state.order)
  const { order, loading, error } = orderDetail;

  React.useEffect(() => {
    dispatch(detailsOrder(props.match.params.id))
  }, [])

  React.useEffect(() => {
    if (order) {
      setDescription(order.description)
    }
  }, [order]) 

  const [description, setDescription] = useState('')
  const [deliverDate, setDeliverDate] = useState(null)  

  // console.log('date', deliverDate)

  //SAVE////
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createOrder({
        _id: order._id,
        description,
        deliverDate
      })
    )

    dispatch(listOrders())//пока это не добавил-не работало дата доставки была старая

    props.history.push("/orders")

  };

  // debugger

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
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

      <div className="card card-body">
        <h2>Информация о покупателе:</h2>
        <p>
          <strong>Имя:</strong> {order.shipping.fullName} <br />
          <strong>Адрес: </strong> {order.shipping.address} <br />
          <strong>Телефон: </strong> {order.shipping.postalCode} <br />
          <strong>Дополнительная информация: </strong> {order.description}
        </p>
        {order.deliveredAt ? (
          <MessageBox variant="success">
            Доставлено: {order.deliveredAt}
          </MessageBox>
        ) : (
          <MessageBox variant="danger">Не доставлено</MessageBox>
        )}
      </div>

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

      <div className="form">

        <form onSubmit={submitHandler}>

          <TextField
            label="Дополнительная информация"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.input}
            // rows={4}
            multiline
            variant="outlined"
          />


          <span>Укажите дату доставки:</span>
          <DatePicker
            selected={deliverDate}
            onChange={date => setDeliverDate(date)}
            dateFormat="dd MMMM, yyyy"

          />
          <Button
            style={{ marginTop: 5}}
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            className={classes.button}
          >
              Подтвердить доставку
                    </Button>



        </form>
      </div>

    </div>
  )
}

export default OrderDeliverScreen

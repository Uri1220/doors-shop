import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import SelectMU from '../components/MU/SelectMU';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '8px',
    lineHeight: 1.5,
    borderColor: '#eee',
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  },
}));


export default function OrdersList(props) {
  const classes = useStyles();

  const [filteredOrders, setFilteredOrders] = React.useState([]);

  // console.log(filteredOrders)
  // filteredOrders.sort(function (a, b) {
  //   // Turn your strings into dates, and then subtract them
  //   // to get a value that is either negative, positive, or zero.
  //   return new Date(a.orderDate) - new Date(b.orderDate);
  // });


  //In SelectMU props//////////////////////////////
  const [age, setAge] = React.useState(10);
  const arr = [
    { id: 1, name: 'Все', ag: 10 },
    { id: 2, name: 'Доставленные', ag: 20 },
    { id: 3, name: 'Не доставленные', ag: 30 },
  ]
  //===============================================


  const dispatch = useDispatch();

  const orderslist = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderslist;

  const productDelete = useSelector((state) => state.orderDelete);
  const {
    success: successDelete,
    error: errorDelete
  } = productDelete;

  React.useEffect(() => {
    dispatch(listOrders())
  }, [successDelete])

  // Delete
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  React.useEffect(() => {
    switch (age) {
      case 20:
        setFilteredOrders(orders.filter(order => order.deliveredAt !== null))
        break
      case 30:
        setFilteredOrders(orders.filter(order => order.deliveredAt === null))
        break
      default:
        setFilteredOrders(orders)
        break
    }
  }, [age, orders,])




  return (
    <div>
      <h1>Все заказы</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <SelectMU age={age} setAge={setAge} arr={arr} title='Заказы:' />
          {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}


          <table className="table">
            <thead>
              <tr>
                <th>Дата заказа</th>
                <th>Заказчик</th>
                {/* <th>Зарегистрированный<br></br>Пользователь</th> */}
                <th>Адрес</th>
                <th>Сумма заказа</th>
                <th>Телефон</th>
                <th>Доставка</th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              {filteredOrders.map((order) => (

                <tr key={order._id}>
                  {/* <td>{order._id}</td> */}
                  {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                  <td>{order.orderDate}</td>
                  {/* <td>{order.orderDate.substring(0, 10)}</td> */}
                  <td>{order.shipping.fullName}</td>
                  {/* <td>{order.user.name}</td> */}
                  <td >{order.shipping.address}</td>
                  <td>{order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</td>
                  <td>{order.shipping.postalCode}</td>
                  <td>{order.deliveredAt ? order.deliveredAt : 'No'}</td>

                  <td>
                    {/* <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/order/${order._id}/deliver`);
                        // props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Details
                         </button> */}
                    <IconButton
                      color="primary"
                      className={classes.button}
                      aria-label="directions"
                      onClick={() => {
                         props.history.push(`/order/${order._id}/deliver`);
                        //  props.history.push(`/order/${order._id}`);
                      }}
                    >

                      <DirectionsIcon />
                    </IconButton>

                    {/* <button style={{marginLeft:'5px'}}
                      className="small"
                      onClick={() => deleteHandler(order)}
                    >
                      Del
                         </button> */}
                    <IconButton
                      aria-label="delete"
                      className={classes.button}
                      color="secondary"
                      onClick={() => deleteHandler(order)}
                    >
                      <DeleteOutlinedIcon fontSize="large" />

                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>)}
    </div>
  );

}

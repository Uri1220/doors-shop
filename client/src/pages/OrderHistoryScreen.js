import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../redux/actions/orderActions';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import { makeStyles } from '@material-ui/core/styles';

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



export default function OrderHistoryScreen(props) {
  const classes = useStyles();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1>Мои заказы</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Дата заказа</th>
              <th>Доставка</th>
              <th>Сумма заказа</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderDate}</td>               
                  <td>{order.deliveredAt ? order.deliveredAt : 'No'}</td>
                  <td>{ order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</td>
                <td>
                  {/* <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Детали
                  </button> */}
                  <IconButton
                      color="primary"
                      className={classes.button}
                      aria-label="directions"
                      onClick={() => {
                         props.history.push(`/order/${order._id}`);
                      }}
                    >

                      <DirectionsIcon />
                    </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
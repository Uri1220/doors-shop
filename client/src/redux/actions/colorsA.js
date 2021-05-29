import axios from 'axios';
import {
  COLOR_LIST_REQUEST,
  COLOR_LIST_SUCCESS,
  COLOR_LIST_FAIL,
  COLOR_DETAILS_REQUEST,
  COLOR_DETAILS_SUCCESS,
  COLOR_DETAILS_FAIL,

  COLOR_SAVE_REQUEST,
  COLOR_SAVE_SUCCESS,
  COLOR_SAVE_FAIL,
  COLOR_DELETE_SUCCESS,
  COLOR_DELETE_FAIL,
  COLOR_DELETE_REQUEST,

} from '../constants/colorsConstants';

export const fetchColors = () => async (dispatch) => {
  try {
    dispatch({ type: COLOR_LIST_REQUEST })
    await axios.get('/api/color')
      .then(data => { dispatch({ type: COLOR_LIST_SUCCESS, payload: data.data }) });

  } catch (error) {
    dispatch({
      type: COLOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

// export const fetchFilterDoors = ({
//   category = '',
//   sub_category,
//   min = 0,
//   max = 0,
// }) => async (dispatch) => {
//   try {
//     dispatch({ type: COLOR_LIST_REQUEST })
//     await axios.get(
//       `/api/doors/list?category=${category}&sub_category=${sub_category}&min=${min}&max=${max}`
//     )
//       .then(data => { dispatch({ type: COLOR_LIST_SUCCESS, payload: data.data }) });

//   } catch (error) {
//     dispatch({ type: COLOR_LIST_FAIL, payload: error.message })
//   }
// };
// // &min=${min}
// // &max=${max}     


// //// асинх получаем  Один  ч-з thunk////////////
// export const fetchDoorDetail = (doorId) => async (dispatch) => {
//   try {
//     dispatch({ type: COLOR_DETAILS_REQUEST, payload: doorId })
//     await axios.get('/api/doors/' + doorId)
//       // await axios.get('http://localhost:5000/api/doors/' + doorId)
//       .then(data => { dispatch({ type: COLOR_DETAILS_SUCCESS, payload: data.data }) })
//     //  .then(data =>  console.log('ddooors',data.data.title));

//   } catch (error) {
//     dispatch({ type: COLOR_DETAILS_FAIL, payload: error.message })
//   }
// };

////////////DELETE
export const deleteColor = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: COLOR_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/color/' + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: COLOR_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: COLOR_DELETE_FAIL, payload: error.message });
  }
};

////////удаляет без проверок на наличие пользователя
// export const deleteProdcut = (productId) => async (dispatch, getState) => {
//   try {

//     dispatch({ type: DOOR_DELETE_REQUEST, payload: productId });
//     const { data } = await axios.delete('/api/doors/' + productId);
//     dispatch({ type: DOOR_DELETE_SUCCESS, payload: data, success: true });
//   } catch (error) {
//     dispatch({ type: DOOR_DELETE_FAIL, payload: error.message });
//   }
// };

////////////SAVE end UPDATE
export const saveColor = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: COLOR_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!product._id) {
      //тут в data только message так определено в colorRoute
      // но можно добавить и product 
      const { data } = await axios.post('/api/color/', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: COLOR_SAVE_SUCCESS, payload: data });
        //  debugger
    } else {
              //Update
      const { data } = await axios.put(
        '/api/color/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: COLOR_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: COLOR_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  };
}






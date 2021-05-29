import axios from 'axios';
import {
  DOORS_LIST_REQUEST,
  DOORS_LIST_SUCCESS,
  DOORS_LIST_FAIL,
  DOORS_MAIN_LIST_REQUEST,
  DOORS_MAIN_LIST_SUCCESS,
  DOORS_MAIN_LIST_FAIL,
  DOOR_DETAILS_REQUEST,
  DOOR_DETAILS_SUCCESS,
  DOOR_DETAILS_FAIL,

  DOOR_SAVE_REQUEST,
  DOOR_SAVE_SUCCESS,
  DOOR_SAVE_FAIL,
  DOOR_DELETE_SUCCESS,
  DOOR_DELETE_FAIL,
  DOOR_DELETE_REQUEST,

  DOOR_REVIEW_SAVE_REQUEST,
  DOOR_REVIEW_SAVE_FAIL,
  DOOR_REVIEW_SAVE_SUCCESS,

} from '../constants/doorsConstants';



//     асинх получаем  все д ч-з thunk
// вызываем в Pens.js
export const fetchDoors = () => async (dispatch) => {
  try {
    dispatch({ type: DOORS_LIST_REQUEST })
    // await axios.get('http://localhost:5000/api/doors/list')
    await axios.get('/api/doors/list')
      .then(data => { dispatch({ type: DOORS_LIST_SUCCESS, payload: data.data }) });

  } catch (error) {
    dispatch({ type: DOORS_LIST_FAIL, payload: error.message })
  }
};

export const fetchFilterDoors = ({
  category = '',
  sub_category,
  min = 0,
  max = 0,
}) => async (dispatch) => {
  try {
    dispatch({ type: DOORS_LIST_REQUEST })
    await axios.get(
      `/api/doors/list?category=${category}&sub_category=${sub_category}&min=${min}&max=${max}`
    )
      .then(data => { dispatch({ type: DOORS_LIST_SUCCESS, payload: data.data }) });
                    // debugger


  } catch (error) {
    dispatch({ type: DOORS_LIST_FAIL, payload: error.message })
  }
};
// &min=${min}
// &max=${max}  
//=================for DoorsMaim
export const fetchColoredDoors = ({
 colorId
}) => async (dispatch) => {
  try {
    dispatch({ type: DOORS_MAIN_LIST_REQUEST,payload:colorId })
    await axios.get(
      `/api/doors/list?colorId=${colorId}`
    )
      .then(data => { dispatch({ type: DOORS_MAIN_LIST_SUCCESS, payload: data.data }) });
            //  debugger      

  } catch (error) {
    dispatch({ type: DOORS_MAIN_LIST_FAIL, payload: error.message })
  }
};
export const fetchWordDoors = ({
 word
}) => async (dispatch) => {
  try {
    dispatch({ type: DOORS_MAIN_LIST_REQUEST })
    await axios.get(
      `/api/doors/list?word=${word}`
    )
      .then(data => { dispatch({ type: DOORS_MAIN_LIST_SUCCESS, payload: data.data }) });
            //  debugger      

  } catch (error) {
    dispatch({ type: DOORS_MAIN_LIST_FAIL, payload: error.message })
  }
};
//=================for DoorsMaim



//// асинх получаем  Один  ч-з thunk////////////
export const fetchDoorDetail = (doorId) => async (dispatch) => {
  try {
    dispatch({ type: DOOR_DETAILS_REQUEST, payload: doorId })
    await axios.get('/api/doors/' + doorId)
      // await axios.get('http://localhost:5000/api/doors/' + doorId)
      .then(data => { dispatch({ type: DOOR_DETAILS_SUCCESS, payload: data.data }) })
    //  .then(data =>  console.log('ddooors',data.data.title));

  } catch (error) {
    dispatch({ type: DOOR_DETAILS_FAIL, payload: error.message })
  }
};

////////////DELETE
export const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: DOOR_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/doors/' + productId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: DOOR_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: DOOR_DELETE_FAIL, payload: error.message });
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

////////////SAVE
export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOOR_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();

        // создать
    if (!product._id) {
      const { data } = await axios.post('/api/doors/', product, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: DOOR_SAVE_SUCCESS, payload: data });
    } else {
      //обновить
      const { data } = await axios.put(
        '/api/doors/' + product._id,
        product,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      // debugger
      dispatch({ type: DOOR_SAVE_SUCCESS, payload: data });
    }


  } catch (error) {
    dispatch({ type: DOOR_SAVE_FAIL, payload: error.message });
  }
};


///записывает без проверок на наличие пользователя
// export const saveProduct = (product) => async (dispatch) => {
//   try {
//     dispatch({ type: DOOR_SAVE_REQUEST, payload: product });

// без PUT
//  const { data } = await axios.post('/api/doors/', product );
//  dispatch({ type: DOOR_SAVE_SUCCESS, payload: data });


//PUT
//     if (!product._id) {
//       const { data } = await axios.post('/api/doors/', product);
//       dispatch({ type: DOOR_SAVE_SUCCESS, payload: data });
//     } else {
//       const { data } = await axios.put(
//         '/api/doors/' + product._id, product);
//       dispatch({ type: DOOR_SAVE_SUCCESS, payload: data });
//     }

//   } catch (error) {
//     dispatch({ type: DOOR_SAVE_FAIL, payload: error.message });
//   }
// };

//////Update
//  export const saveProductReview = (productId, review) => async (dispatch, getState) => {
//   try {
//     const {
//       userSignin: {
//         userInfo: { token },
//       },
//     } = getState();
//     dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
//     const { data } = await axios.post(
//       `/api/products/${productId}/reviews`,
//       review,
//       {
//         headers: {
//           Authorization: 'Bearer ' + token,
//         },
//       }
//     );
//     dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
//   } catch (error) {
//     // report error
//     dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
//   }
// };
//////Update
export const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {

    dispatch({ type: DOOR_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/doors/${productId}/reviews`,
      review,

    );
    dispatch({ type: DOOR_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: DOOR_REVIEW_SAVE_FAIL, payload: error.message });
  }
};






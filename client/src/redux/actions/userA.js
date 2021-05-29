import Axios from "axios";
//  import Cookie from 'js-cookie';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_SIGNOUT,
  // USER_REGISTER_CLEAR_MESSAGE
  // USER_LOGOUT,
  //  USER_UPDATE_REQUEST,
  //   USER_UPDATE_SUCCESS,
  //   USER_UPDATE_FAIL,
} from "../constants/userConstants";

// const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
//   const { userSignin: { userInfo } } = getState();
//   dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
//   try {
//     const { data } = await Axios.put("/api/users/" + userId,
//       { name, email, password }, {
//       headers: {
//         Authorization: 'Bearer ' + userInfo.token
//       }
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set('userInfo', JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// }

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    //то что прилетает {data} прописано в userRoute.js стр92-100:
    // res.json({     
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: getToken(user),
    // })

    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    //вижу в том числе и токен
    //  console.log(data)
     localStorage.setItem('userInfo', JSON.stringify(data));
    //загружаю в куки далее  в store.js  userInfo подгружается в initialstate
    //  Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL,
      //  payload: error.message 
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    //то что прилетает {data} прописано в userRoute.js стр92-100:
    // res.status(201).json({ message: 'Пользователь создан' })

    const { data } = await Axios.post("/api/users/register", { name, email, password });
      //  console.log(data)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // dispatch({ type: USER_REGISTER_CLEAR_MESSAGE , payload});
    //  Cookie.set('userInfo', JSON.stringify(data));

    //  { message: 'Пользователь создан' }
    //почему с записью в localStorage 'Пользователь создан'
    //прилетает в State.userSignin  так и не понял
    // localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, 
      // payload: error.message 
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    
    });
  }
}

// const logout = () => (dispatch) => {
  // Cookie.remove("userInfo");
  // dispatch({ type: USER_LOGOUT })
// }

 const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  //этот диспатч не создает стэйт
  dispatch({ type: USER_SIGNOUT });
   document.location.href = '/';
};

 const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // debugger
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

 const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};
export { signin, register, signout,updateUserProfile, detailsUser  };
import {
   USER_SIGNIN_REQUEST,
   USER_SIGNIN_SUCCESS,
   USER_SIGNIN_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL,
   USER_SIGNOUT,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_UPDATE_FAIL,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_RESET,
   USER_DETAILS_SUCCESS,
   USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
//   USER_REGISTER_CLEAR_MESSAGE
} from "../constants/userConstants";


  //userSignin:userSigninReducer,
function userSigninReducer(state = {}, action) {
   switch (action.type) {
      case USER_SIGNIN_REQUEST:
         return { loading: true };
      case USER_SIGNIN_SUCCESS:
         return { loading: false, userInfo: action.payload };
      // case  USER_REGISTER_CLEAR_MESSAGE:
      //    return { loading: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
         return { loading: false, error: action.payload };
      case  USER_SIGNOUT:
         return {};
      default: return state;
   }
}

function userRegisterReducer(state = {}, action) {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
         return { loading: false, error: action.payload };
      default: return state;
   }
}

function userUpdateReducer(state = {}, action) {
   switch (action.type) {
      case USER_UPDATE_REQUEST:
         return { loading: true };
      case USER_UPDATE_SUCCESS:
         return { loading: false, userInfo: action.payload };
      case USER_UPDATE_FAIL:
         return { loading: false, error: action.payload };
      default: return state;
   }
}



const userDetailsReducer = (state = { loading: true }, action) => {
   switch (action.type) {
     case USER_DETAILS_REQUEST:
       return { loading: true };
     case USER_DETAILS_SUCCESS:
       return { loading: false, user: action.payload };
     case USER_DETAILS_FAIL:
       return { loading: false, error: action.payload };
     case USER_DETAILS_RESET:
       return { loading: true };
     default:
       return state;
   }
 }

 const userUpdateProfileReducer = (state = {}, action) => {
   switch (action.type) {
     case USER_UPDATE_PROFILE_REQUEST:
       return { loading: true };
     case USER_UPDATE_PROFILE_SUCCESS:
       return { loading: false, success: true };
     case USER_UPDATE_PROFILE_FAIL:
       return { loading: false, error: action.payload };
     case USER_UPDATE_PROFILE_RESET:
       return {};
     default:
       return state;
   }
 };
export {
   userSigninReducer, userRegisterReducer, userUpdateReducer,
   userDetailsReducer,userUpdateProfileReducer,
}
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

const initialState = {
  colors: [],
  loading: false,
  //  error: ''
}

function colorsListReducer(state = initialState, action) {
  switch (action.type) {
    case COLOR_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case COLOR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        colors: action.payload
      };
    case COLOR_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}
// function doorDetailReducer(state = { door: {} }, action) {

//    switch (action.type) {
//       case DOOR_DETAILS_REQUEST:
//          return {
//             ...state,
//             isLoading: true
//          };

//       case DOOR_DETAILS_SUCCESS:
//          return {
//             ...state,
//             isLoading: false,
//             door: action.payload
//          };

//       case DOOR_DETAILS_FAIL:
//          return {
//             ...state,
//             isLoading: false,
//             error: action.payload
//          };

//       default:
//          return state;


//    }

// }


function colorDeleteReducer(state = { color: {} }, action) {
   switch (action.type) {
     case COLOR_DELETE_REQUEST:
       return { isLoading: true };
     case COLOR_DELETE_SUCCESS:
       return { isLoading: false, color: action.payload, success: true };
     case COLOR_DELETE_FAIL:
       return { isLoading: false, error: action.payload };
     default:
       return state;
   }
 }

function colorSaveReducer(state = { color: {} }, action) {
  switch (action.type) {
    case COLOR_SAVE_REQUEST:
      return { isLoading: true };
    case COLOR_SAVE_SUCCESS:                            //data из action
      return { isLoading: false, success: true, message: action.payload };
    case COLOR_SAVE_FAIL:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
}



export {
   colorsListReducer,
  // doorDetailReducer,
  colorDeleteReducer,
  colorSaveReducer,
} 

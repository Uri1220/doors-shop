import {
   CAT_REQUEST,
   CAT_SUCCESS,
   CAT_FAIL,
   CAT_LIST_REQUEST,
   CAT_LIST_SUCCESS,
   CAT_LIST_FAIL,
} from "../constants/categoryConstans";




function catCreateReducer(state = {}, action) {
   switch (action.type) {
      case CAT_REQUEST:
         return { loading: true };
      case CAT_SUCCESS:
         return { loading: false, catMessage: action.payload };
      case CAT_FAIL:
         return { loading: false, error: action.payload };
      default: return state;
   }
}

 const catListReducer = (state = { cats: [] }, action) => {
   switch (action.type) {
     case CAT_LIST_REQUEST:
       return { ...state, loading_cat: true };
     case CAT_LIST_SUCCESS:
       return { ...state, loading_cat: false, cats: action.payload };
     case CAT_LIST_FAIL:
       return { ...state, loading_cat: false, error_cat: action.payload };
     default:
       return state;
   }
 };



export {
   catCreateReducer,catListReducer
}
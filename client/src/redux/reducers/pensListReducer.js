import {
   PENS_LIST_REQUEST,
   PENS_LIST_SUCCESS,
   PENS_LIST_FAIL,

   PEN_DETAILS_REQUEST,
   PEN_DETAILS_SUCCESS,
   PEN_DETAILS_FAIL,

} from '../constants/pensConstants';

const initialState = {
   pens: [],
   isLoading: false,
   //  error: ''

}

function pensListReducer(state = initialState, action) {

   switch (action.type) {
      case PENS_LIST_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case PENS_LIST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            pens: action.payload
         };

      case PENS_LIST_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}
function penDetailReducer(state = { pen: {} }, action) {

   switch (action.type) {
      case PEN_DETAILS_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case PEN_DETAILS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            pen: action.payload
         };

      case PEN_DETAILS_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}

export {
   pensListReducer,
   penDetailReducer
} 

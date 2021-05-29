import {
   DOORS_LIST_REQUEST,
   DOORS_LIST_SUCCESS,
   DOORS_LIST_FAIL,

   DOORS_MAIN_LIST_REQUEST,
   DOORS_MAIN_LIST_SUCCESS,
   DOORS_MAIN_LIST_FAIL,
   DOORS_MAIN_LIST_RESET,

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

const initialState = {
   doors: [],
   isLoading: false,
   //  error: ''

}

function doorsListReducer(state = initialState, action) {

   switch (action.type) {
      case DOORS_LIST_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case DOORS_LIST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            doors: action.payload
         };

      case DOORS_LIST_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}
function doorsForMainReducer(state = { doorsMain: [],color:'' }, action) {

   switch (action.type) {
      case DOORS_MAIN_LIST_REQUEST:
         return {
            ...state,
            color:action.payload,
            isLoading: true
         };

      case DOORS_MAIN_LIST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            doorsMain: action.payload
         };
      case DOORS_MAIN_LIST_RESET:
         return {
            ...state,
            isLoading: false,
            doorsMain:[],
            color:''
         };

      case DOORS_MAIN_LIST_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}
function doorDetailReducer(state = { door: {} }, action) {

   switch (action.type) {
      case DOOR_DETAILS_REQUEST:
         return {
            ...state,
            isLoading: true
         };

      case DOOR_DETAILS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            door: action.payload
         };

      case DOOR_DETAILS_FAIL:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         };

      default:
         return state;


   }

}


function doorDeleteReducer(state = { door: {} }, action) {
   switch (action.type) {
     case DOOR_DELETE_REQUEST:
       return { isLoading: true };
     case DOOR_DELETE_SUCCESS:
       return { isLoading: false, door: action.payload, success: true };
     case DOOR_DELETE_FAIL:
       return { isLoading: false, error: action.payload };
     default:
       return state;
   }
 }
 
 function doorSaveReducer(state = { door: {} }, action) {
   switch (action.type) {
     case DOOR_SAVE_REQUEST:
       return { isLoading: true };
     case DOOR_SAVE_SUCCESS:
       return { isLoading: false, success: true, door: action.payload };
     case DOOR_SAVE_FAIL:
       return { isLoading: false, error: action.payload };
     default:
       return state;
   }
 }
 function doorReviewSaveReducer(state = {}, action) {
   switch (action.type) {
     case DOOR_REVIEW_SAVE_REQUEST:
       return { isLoading: true };
     case DOOR_REVIEW_SAVE_SUCCESS:
       return { isLoading: false, review: action.payload, success: true };
     case DOOR_REVIEW_SAVE_FAIL:
       return { isLoading: false, errror: action.payload };
   //   case DOOR_REVIEW_SAVE_RESET:
   //     return {};
     default:
       return state;
   }
 }
 

export {
   doorsListReducer,
   doorDetailReducer,
   doorDeleteReducer,
   doorSaveReducer,
   doorReviewSaveReducer,
   doorsForMainReducer
} 

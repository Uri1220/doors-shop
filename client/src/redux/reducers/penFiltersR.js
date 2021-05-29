import {
   LOAD_CATEGORY,
   LOAD_SUB2_CAT,
   LOAD_SUB_CATEGORY
} from '../constants/pensConstants';

const initialState = {
   category: 0,
   subCat:0,
   subSubCat: 0
}

function penFilters(state = initialState, action) {
   switch (action.type) {

      case LOAD_CATEGORY:
         return {
            ...state,
            category: action.payload
         };
      case LOAD_SUB_CATEGORY:
         return {
            ...state,
            subCat: action.payload
         };
      case LOAD_SUB2_CAT:
         return {
            ...state,
            subSubCat: action.payload
         };

      default:
         return state;

   }
}

export { penFilters }

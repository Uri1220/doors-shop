import { penFilters } from './penFiltersR'
import { catCreateReducer,catListReducer} from './CatReduser'
import { pensListReducer, penDetailReducer } from './pensListReducer'
import { doorsForMainReducer,doorsListReducer, doorDetailReducer, doorSaveReducer, doorDeleteReducer,doorReviewSaveReducer} from './doorsListReducer'
import {  userSigninReducer, userRegisterReducer,  userDetailsReducer,userUpdateProfileReducer, userUpdateReducer } from './userReducers'
import { orderCreateReducer,orderDetailsReducer,orderListReducer,orderDeleteReducer,orderMineListReducer } from './orderReducers'
import { colorSaveReducer, colorsListReducer,colorDeleteReducer,} from './colorsReducer'
import { cartReducer } from './cartReducer'

import {combineReducers} from 'redux';


export const rootReducer = combineReducers({
      pens: pensListReducer,
      penFilters:penFilters,
      pen: penDetailReducer,
      doors: doorsListReducer,
      doorsMain: doorsForMainReducer,
      door: doorDetailReducer,
      cart:cartReducer,
      userSignin:userSigninReducer,
      userRegister: userRegisterReducer,
      doorSave: doorSaveReducer,
      doorDelete: doorDeleteReducer,
      doorReviewSave: doorReviewSaveReducer,

      orderCreate:orderCreateReducer,
      orderList:orderListReducer,
      orderDelete:orderDeleteReducer,
      orderMineList:orderMineListReducer,
      order:orderDetailsReducer,
      
      colorCreate:colorSaveReducer,
      colors:colorsListReducer,
      colorDelete:colorDeleteReducer,
      // colorMineList:orderMineListReducer,
      // color:orderDetailsReducer,

      userDetails:userDetailsReducer,
      userUpdateProfile:userUpdateProfileReducer,
      // orderDeliver:orderDeliverReducer,
      catCreate:catCreateReducer,
      catsList:catListReducer,
   })
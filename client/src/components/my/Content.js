import React from 'react'
import Pens from '../../pages/Pens'
import Plintus from '../../pages/Plintus'
import Doors from '../../pages/Doors'
import DoorsMain from '../../pages/DoorsMain'
import Home from '../../pages/Home'
import { Route, Switch } from 'react-router-dom'
import PenOne from '../../pages/PenOne'
import DoorOne from '../../pages/DoorOne'
import Cart from '../../pages/Cart'
import SigninScreen from '../../pages/SigninScreen'
import RegisterScreen from '../../pages/RegisterScreen'
import MakeDoorScreen from '../../pages/MakeDoorScreen'
import ShippingAddressScreen from '../../pages/ShippingAddressScreen'
import PlaceOrderScreen from '../../pages/PlaceOrderScreen'
import OrdersList from '../../pages/OrdersList'
 import OrderHistoryScreen from '../../pages/OrderHistoryScreen'
import OrderScreen from '../../pages/OrderScreen'
import OrderDeliverScreen from '../../pages/OrderDeliverScreen'
import ProfileScreen from '../../pages/ProfileScreen'
import Breadcrumb from '../my/Breadcramb'
import Color from '../../pages/Color'
import Delivery from './Delivery'
import Payment from './Payment'


const Content = () => {

  return (
    <main  className="main">

      <div className="content">
        {/* <Breadcrumb/> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route 
           path="/implements/category/:category/sub_category/:sub_category" 
           exact component={Pens}  />
          <Route 
           path="/implements/category/:category" 
           exact component={Pens}  />
          <Route path="/signin" exact component={SigninScreen}  />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/pens/:id" component={PenOne}  />
          <Route path="/cart/:id?" component={Cart}  />
          <Route path="/plintus" component={Plintus} />
          <Route path="/delivery" component={Delivery} />
          <Route path="/payment" component={Payment} />

          {/* <Route path="/doors" exact component={Doors} /> */}
          {/* <Route path="/doors" exact> <Doors/> </Route> */}
          <Route path="/doors/:id" exact component={DoorOne}  />

          <Route
            path="/doors/category/:category"
            component={Doors}
             exact
          ></Route>
          <Route
            path="/door/word/:word?"
            component={DoorsMain}
             exact
          ></Route>
          <Route
            path="/door/colorId/:colorId?"
            component={DoorsMain}
               exact
          ></Route>

          <Route
            path="/doors/category/:category/sub_category/:sub_category"
            component={Doors}
             exact
          ></Route>
          {/* <Route
            path="/search/category/:category"
            component={MySearch}
            exact
          ></Route> */}
           <Route
            path="/doors/category/:category/min/:min/max/:max"
            component={Doors}
             exact
          ></Route>
           <Route
            // path="/doors/category/{category}/sub_category/{sub_category}/min/{min}/max/{max}"
             path="/doors/category/:category/sub_category/:sub_category/min/:min/max/:max"
            component={Doors}
             exact
          ></Route>

          <Route path="/makedoor" component={MakeDoorScreen} />
          <Route path="/orders" component={OrdersList} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/order" exact component={PlaceOrderScreen} />
          <Route path="/order/:id" exact component={OrderScreen} />
          <Route path="/order/:id/deliver" exact component={OrderDeliverScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/colors" component={Color} />
        </Switch>

        
      </div>
    </main>

  )
}
export default Content;
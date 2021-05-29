import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import CartInHeader from '../MU/CartInHeader'
import HeaderDropMU from '../MU/HeaderDropMU'
import HeaderDropPhoneMU from '../MU/HeaderDropPhoneMU'
import HeaderDropWhereMU from '../MU/HeaderDropWhereMU'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';





const Header = ({ openMenu }) => {



   const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;


   return (
      <div className="header">
         <div className="header__top">
            <button onClick={openMenu} className="hamburger">&#9776;</button>
            <div className="header__phone">
                  <HeaderDropPhoneMU />
            </div>

            <div style={{ marginLeft: 'auto' }}>
               <HeaderDropMU />
            </div>

            <div style={{ margin:'0 20px 0 10px' }}>
               <Link  to={"/cart/"}>
                  <CartInHeader total={cartItems.length} />
               </Link>
            </div>
         </div>

         <div className="header__bottom">

                  <Link className="header__bottom_link" to={"/delivery"}>
                     <LocalShippingIcon color="primary" /><p>Доставка</p>
                  </Link>  

                  <Link className="header__bottom_link" to={"/payment"}>
                     <PaymentIcon color="primary" /> <p> Оплата</p>
                  </Link>
                 
                   <HeaderDropWhereMU /> 


         </div>
      </div>

   )
}
export default Header;


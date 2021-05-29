import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/actions/cartA';
// import CheckoutSteps from '../components/CheckoutSteps';


function formatPhoneNumber(value) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early

   if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 2)})${phoneNumber.slice(2)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 2)})${phoneNumber.slice(2,5)}-${phoneNumber.slice(5,9)}`;
}


export default function ShippingAddressScreen(props) {


  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName ? shippingAddress.fullName : '');
  const [address, setAddress] = useState(shippingAddress.address ? shippingAddress.address : '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ? shippingAddress.postalCode : '');

  // const [value, setValue] = useState()

  const [blurPostalCode, setBlurPostalCode] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState('');
  // const [postalCodeError, setPostalCodeError] = useState('Поле не может быть пустым');

  const blurHandler = (e) =>{
    switch(e.target.name){
      case  'postalCode':
      setBlurPostalCode(true)
      break
    }
  }


    //  console.log('len:', postalCode.length) 
    //  console.log('phone:', postalCode) 
   
  const postalCodeHandler = (e) => {
    const re = /^\((17|29|33|44)\)[0-9]{3}-[0-9]{4}$/ //(29)666-6666
    if (!re.test(e.target.value))  {
    // if (!re.test(String(e.target.value).toLowerCase()) && (e.target.value).length < 11) {
      setPostalCodeError('Некоррекный номер телефона')
    } else {
      setPostalCodeError('')
      // setBlurPostalCode(false)
    }
    // ф-ция вверху в закладке React-format phone number
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPostalCode(formattedPhoneNumber);
    }

  // const postalCodeHandler = (e) => {
  //   setPostalCode(e.target.value)
  //   // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   //  const re = /^\+375 \((17|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/ //+375 (29) 677-66-77
  //   //  const re = /^\+375\((17|29|33|44)\)[0-9]{7}$/ //+375(17)7777777
  //    const re = /^\((17|29|33|44)\)[0-9]{3}-[0-9]{4}$/ //(29)666-6666
  //   //  if (!re.test(e.target.value)) {
  //     if (!re.test(String(e.target.value).toLowerCase())) {
  //       setPostalCodeError('Некоррекный номер телефона')
  //     } else {
  //       setPostalCodeError('')
  //     }
  //   }
  

  const dispatch = useDispatch();
  // debugger

  const submitHandler = (e) => {
    e.preventDefault();
      if(!postalCodeError){
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        postalCode,
      })
    );
    props.history.push('/order');
      }
  };
  return (
    <div>

      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <form className="form"
        onSubmit={submitHandler}
      >
        <div>
          <h1>Контактные данные</h1>
        </div>
        <div>
          <label htmlFor="fullName">Ф.И.О.</label>
          <input
            type="text"
            name="fullName"
            placeholder="Введите имя"
            value={fullName}
            // onChange={e => fullNameHandler(e)}
             onChange={(e) => setFullName(e.target.value)}
            required // срабатывает "Заполните это поле"
          ></input>

        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            name="address"
            placeholder="Введите адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>

        </div>     
        <div>
          <label htmlFor="postalCode">Телефон: <span style={{fontSize:'11px'}}>введите 9 цифр, вначале код 17 или 29 или 33 или 44</span></label>
          <input
            type="text"
            name="postalCode"
            maxLength="12"
             placeholder="(00)0000000"
            value={postalCode}
            onBlur={e => blurHandler(e)}
            onChange={e => postalCodeHandler(e)}
            required
          ></input>
          { (blurPostalCode && postalCodeError) && <div style={{ color: 'red' }} >{postalCodeError}</div>}

        </div>       

        <div>
          <label />
          <button 
          className="primary"
           type="submit"
          //  disabled ={!formValid}
          >
            Продолжить
          </button>
        </div>
      </form>
     
    </div>
  );
}

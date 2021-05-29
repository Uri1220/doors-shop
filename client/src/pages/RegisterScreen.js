import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../redux/actions/userA';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMes, setErrMes] = useState('');

  const [blurPassword, setBlurPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
  const [blurEmail, setBlurEmail] = useState(false);
  const [emailError, setEmailError] = useState('Поле не может быть пустым');

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'password':
        setBlurPassword(true)
        break
      case 'email':
        setBlurEmail(true)
        break
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть от 3 до 8 символов')
      if (!e.target.value) {
        setPasswordError('Поле не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
             setEmailError('Некоррекный email')
          } else {
             setEmailError('')
           }
  }
  //cart:  props.location.search: ?qty=1=sz=200*60=cl=no-color
  // const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  // const sz = props.location.search ? String(props.location.search.split("=")[3]) : 'no-size';
  // const cl = props.location.search ? String(props.location.search.split("=")[5]) : '';
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // alert('Password and confirm password are not match');
      setErrMes('Подтверждение пароля неверно')

    } else {
      dispatch(register(name, email, password));
    }
  };



  // в state есть userInfo поэтому страница не отображся идет редирект
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    setErrMes(error)
  }, [error, props.history, redirect, userInfo]);

  useEffect(() => {
    window.M.updateTextFields()
    setErrMes('')
  }, [])


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Регистрация</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {errMes && <MessageBox variant="danger">{errMes}</MessageBox>}
        <div>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            placeholder="Ввведите имя"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите email"
            required
            onBlur={e => blurHandler(e)}
            onChange={(e) => emailHandler(e)}
          ></input>
          {(blurEmail && emailError) && <div style={{ color: 'red' }} >{emailError}</div>}

        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Введите пароль"
            required
            onBlur={e => blurHandler(e)}
            onChange={(e) => passwordHandler(e)}
          ></input>
          {(blurPassword && passwordError) && <div style={{ color: 'red' }} >{passwordError}</div>}

        </div>
        <div>
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Подтвердите пароль"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Зарегистрироваться
          </button>
        </div>
        <div>
          <label />
          <div>
            Уже зарегистрированы?{' '}
            <Link to={`/signin`}>Войти</Link>
            {/* <Link to={`/signin?redirect=${redirect}`}>Войти</Link> */}
          </div>
        </div>
      </form>
    </div>
  );
}
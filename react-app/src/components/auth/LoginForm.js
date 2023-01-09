import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else{
      history.push('/home')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <div id='login-container'>
            {/* <SignUpForm/> */}
            <form id='loginform' onSubmit={onLogin} >
              <div id='login-title'>Log in</div>

              <div className='login-item'>
                <label htmlFor='email'>Email</label>
                <input
                  name='email'
                  type='text'
                  className='login-input'
                  placeholder='Your email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className='login-item'>
                <label htmlFor='password'>Password</label>
                <input
                  name='password'
                  type='password'
                  className='login-input'
                  placeholder='Your password'
                  value={password}
                  onChange={updatePassword}
                />
                <div>
                  {errors.map((error, ind) => (
                <div key={ind} className='loginerror'>{error}</div>
                ))}
              </div>
                <div id='login-btndiv'>
                  <button id='login-btn' type='submit'>Login</button>
                </div>
              </div>
            </form>
      </div>
    </>
  );
};

export default LoginForm;

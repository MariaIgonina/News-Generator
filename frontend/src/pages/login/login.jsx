import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser, deleteUser } from '../../store/authSlice';
import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setToken } from '../../store/authSlice';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

export default function Login() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const tokenCheck = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  //Auth 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isRegistered && (user.email.trim() === '' || user.password.trim() === '' || user.name.trim() === '')) {
      setAlert({ type: 'error', message: 'Please fill all the fields!' });
      return;
    } else if (isRegistered && (user.email.trim() === '' || user.password.trim() === '')) {
      setAlert({ type: 'error', message: 'Please fill all the fields!' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setAlert({ type: 'error', message: 'Please enter a valid email address!' });
      return;
    }

    if (!isRegistered) {
      const registerResponse = await dispatch(registerUser(user));
      if (registerResponse.error) {
        setAlert({ type: 'error', message: registerResponse.error.message }); ///////
      } else {
        setAlert({ type: 'success', message: 'Registration successful.' });
        
        localStorage.setItem('user', registerResponse.payload.access_token);
        setTimeout(() => {
          setAlert({ type: '', message: '' });
          navigate('/');
        }, 2000);
      }
    } else {
      const loginResponse = await dispatch(loginUser(user));
      if (loginResponse.error) {
        setAlert({ type: 'error', message: loginResponse.error.message }); ///////
      } else {
        localStorage.setItem('user', loginResponse.payload.access_token);
        navigate('/');
      }
    }

    setUser({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleLogout = async () => {
    const logoutResponse = await dispatch(logoutUser());
    if (logoutResponse.error) {
      const errorMessage = logoutResponse.error.message.length > 70 ? 'Server error' : logoutResponse.error.message
      setAlert({ type: 'error', message: errorMessage }); ///////
    } else {
      localStorage.removeItem('user');
      dispatch(setToken(null));
      setAlert({ type: 'success', message: 'Logout successful.' });
    }
  };

  const handleDeleteAccount = async () => {
    const deleteResponse = await dispatch(deleteUser());
    if (deleteResponse.error) {
      setAlert({ type: 'error', message: deleteResponse.error.message }); ///////
    } else {
      localStorage.removeItem('user');
      setAlert({ type: 'success', message: 'Account successfully deleted.' });
    }
  };

  //To close the alert
  useEffect(() => {
    let timeout;
    if (alert && alert.message) {
      timeout = setTimeout(() => {
        setAlert(prevAlert => ({ ...prevAlert, message: '' }));
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [alert]);
  
  useEffect(() => console.log(tokenCheck), [tokenCheck]);
  
  return (
    <div className='form-login'>
      {tokenCheck ? (
        <div>
          <h2 className='login-headers'>Account Management</h2>
          <div className='button-group'>
            <Button
              variant="contained"
              className='signin-button'
              onClick={handleLogout}
            >
              Logout
            </Button>
  
            <Button
              variant="contained"
              className='login-button'
              onClick={handleDeleteAccount}
            >
              Delete my account
            </Button>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            {!isRegistered && (
              <div className='inputs-login'>
                <h2 className='login-headers'>Get Started</h2>
                <TextField
                  id="input-name"
                  variant="outlined"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={user.name}
                  size="small"
                  margin='dense'
                />
              </div>
            )}
  
            {isRegistered && <h2 className='login-headers'>Account Access</h2>}
            <div className='inputs-login'>
              <TextField
                id="input-login"
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
                size="small"
                margin='dense'
              />
            </div>
  
            <div className='inputs-login'>
              <TextField
                id="input-password"
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={user.password}
                size="small"
                margin='dense'
              />
            </div>
  
            <div className='button-group'>
              <Button
                variant="contained"
                className='signin-button'
                type='submit'
              >
                {!isRegistered ? 'Sign in' : 'Login'}
              </Button>
  
              <Button
                variant="contained"
                className='login-button'
                onClick={() => setIsRegistered(!isRegistered)}
              >
                {!isRegistered ? 'I have an account' : 'Back to registration'}
              </Button>
            </div>
          </form>
          {alert.type === 'error' && alert.message && (
            <Alert className="alert" severity="error">
              {alert.message}
            </Alert>
          )}
          {alert.type === 'success' && alert.message && (
            <Alert className="alert" severity="success">
              {alert.message}
            </Alert>
          )}
        </>
      )}
    </div>
  );
}  
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fsM, setFsM] = useState('');

  function onEmailChange(e){
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(e.target.value.trim())
    if(e.target.value.trim() === ""){
      setErrorMessage("Email shouldn't be empty")
    }
    else if(!re.test(e.target.value.trim())){
      setErrorMessage("Invalid Email")
    }else{
      setErrorMessage("")
    };
  }

  async function handleLogin(e) {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', {email, password})
      setFsM(res.data.msg)
      localStorage.setItem('firstLogin', true)
     
      setEmail('');
      setPassword('');
      setErrorMessage('');
      setFsM('')


      window.location.href = "/home";

  } catch (err) {
      setErrorMessage(err.response.data.msg)
  }

  };

  return (
    <div className='center_it'>
    <div className='login-container'>
    <div className='Webapp_Div'>
      <div className='left'><Link to="/login"><button>Login</button></Link></div>
      <div className='right'><Link to="/register"><button>Register</button></Link></div>
    </div>
      <h2>Login</h2>
      {fsM && <p className='success-message'>{fsM}</p>}
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={onEmailChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;

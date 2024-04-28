import React, { useState } from 'react';
import axios from 'axios'

import Logreg from '../reusable/logreg/Logreg';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      localStorage.setItem('firstLogin', true)
      localStorage.setItem('name',res.data.name)
      localStorage.setItem('id',res.data.id)
      setEmail('');
      setPassword('');
      setErrorMessage('');


      window.location.href = "/home";

  } catch (err) {
      setErrorMessage(err.response.data.msg)
  }

  };

  return (
    <div className='center_it'>
    <div className='login-container'>
      <Logreg/>
      <h2>Login</h2>
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

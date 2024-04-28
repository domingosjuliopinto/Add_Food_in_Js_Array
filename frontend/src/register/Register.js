import React, { useState } from 'react';
import axios from 'axios'

import Logreg from '../reusable/logreg/Logreg';
import './register.css';

const {v4 : uuidv4} = require('uuid')

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function onNameChange(e){
    const re = /^[a-zA-Z]+[a-zA-Z ]*$/;
    setFormData({...formData, name:e.target.value.trim()})
    if(e.target.value.trim() === ""){
      setErrors({...errors,name:"Name is required"})
    }
    else if(!re.test(e.target.value.trim())){
      setErrors({...errors,name:"Name should have only Alphabets"})
    }else{
      setErrors({...errors,name:""})
    }  
  }

  function onEmailChange(e){
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setFormData({...formData, email:e.target.value.trim()})
    if(e.target.value.trim() === ""){
      setErrors({...errors,email:"Email shouldn't be empty"})
    }
    else if(!re.test(e.target.value.trim())){
      setErrors({...errors,email:"Invalid Email"})
    }else{
      setErrors({...errors,email:""})
    };
  }

  function onPsdChange(e){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setFormData({...formData, password:e.target.value})
    if(!re.test(e.target.value.trim())){
      setErrors({...errors,password:"Password doesn't match the condition"})
    }else{
      setErrors({...errors,password:""})
    };
  }

  function onRpsdChange(e){
    setFormData({...formData, confirmPassword:e.target.value})
    if(formData.password !== e.target.value){
      setErrors({...errors,confirmPassword:"Re-entered password doesn't match the typed password"})
    }else{
      setErrors({...errors,confirmPassword:""})
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const id = generateUniqueId();
      const name = formData.name;
      const email = formData.email;
      const password = formData.password;

        try {
          const res = await axios.post('http://localhost:5000/register', {
              id, name, email, password
          })
          setSuccessMessage(res.data.msg+`! Your ID is ${id}`);
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
      } catch (err) {
          setErrors({errors:err.response.data.msg});
          setSuccessMessage("");
      }
    } else {
      setErrors(errors);
      setSuccessMessage("");
    }
  };

  const validateForm = (formData) => {
    const re1 = /^[a-zA-Z]+[a-zA-Z ]*$/;
    const re2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    else if(!re1.test(formData.name.trim())){
      errors.name ="Name should have only Alphabets";
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if(!re2.test(formData.password)){
      errors.password ="Password doesn't match the condition";
    }
    
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const generateUniqueId = () => {
    const userId = uuidv4()
    return userId;
  };

  return (
    <div className='center_it'>
    <div className='register-container'>
      <Logreg/>
      <h2>Registration</h2>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onNameChange}
          />
          {errors.name && <p className='error-message'>{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onEmailChange}
          />
          {errors.email && <p className='error-message'>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onPsdChange}
          />
          {errors.password && <p className='error-message'>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label><br/>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onRpsdChange}
          />
          {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;

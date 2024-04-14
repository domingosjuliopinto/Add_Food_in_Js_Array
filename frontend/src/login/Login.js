import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtnGroup
  }
  from 'mdb-react-ui-kit';

import { Link , useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'


function Login(){

  const history = useNavigate()

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [psd, setPsd] = useState('');
  const [feM, setFeM] = useState('');
  const [fsM, setFsM] = useState('');

  function onEmailChange(e){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(e.target.value.trim())
    if(e.target.value.trim() === ""){
      setEmailErr("Email shouldn't be empty")
    }
    else if(!re.test(e.target.value.trim())){
      setEmailErr("Invalid Email")
    }else{
      setEmailErr("")
    };
  }

  function onPsdChange(e){
    setPsd(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const password = psd
    try {
        const res = await axios.post('http://localhost:3000/login', {email, password})
        setFsM(res.data.msg)
        setFeM("")
        localStorage.setItem('firstLogin', true)
        if(window.location.href ==='http://localhost:3001/'||window.location.href ==='http://localhost:3001/login'){
          history("/success")
        }
        if(window.location.href ==='http://localhost:3001/success'){
          window.location.reload()
        }
        

    } catch (err) {
        err.response.data.msg && 
        setFeM(err.response.data.msg)
    }
}

    return (
        <MDBContainer fluid>
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
              
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                  <MDBBtnGroup shadow='0' aria-label='Basic example' className="d-flex justify-content-evenly">
                  <Link to="/login">
                    <MDBBtn color='secondary' outline>
                      Login
                    </MDBBtn>
                  </Link>
                  <Link to="/register">
                    <MDBBtn color='secondary' outline>
                      Register
                    </MDBBtn>
                  </Link>
                  </MDBBtnGroup>
                  <br></br>
    
                  <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                  <p className="text-danger mb-3">{feM}</p>
                  <p className="text-success mb-3">{fsM}</p>
    
                  <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={onEmailChange}/>
                  <p className="text-danger mb-3">{emailErr}</p>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" value={psd} onChange={onPsdChange} />
    
                  <MDBBtn size='lg' onClick={handleSubmit}>
                    Login
                  </MDBBtn>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}

export default Login
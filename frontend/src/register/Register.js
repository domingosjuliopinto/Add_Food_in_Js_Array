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

import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psd, setPsd] = useState('');
    const [rpsd, setRpsd] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [psdErr, setPsdErr] = useState('');
    const [rpsdErr, setRpsdErr] = useState('');
    const [fsM, setFsM] = useState('');
    const [feM, setFeM] = useState('');

    function onNameChange(e){
      const re = /^[a-zA-Z]+[a-zA-Z ]*$/;
      setName(e.target.value.trim())
      if(e.target.value.trim() === ""){
        setNameErr("Name shouldn't be empty")
      }
      else if(!re.test(e.target.value.trim())){
        setNameErr("Name should have only Alphabets")
      }else{
        setNameErr("")
      };
      
    }

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
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setPsd(e.target.value)
      if(!re.test(e.target.value.trim())){
        setPsdErr("Password doesn't match the condition")
      }else{
        setPsdErr("")
      };
    }

    function onRpsdChange(e){
      setRpsd(e.target.value)
      if(psd !== e.target.value){
        setRpsdErr("Re-entered password doesn't match the typed password")
      }else{
        setRpsdErr("")
      }
    }

    async function handleSubmit(){
      if(nameErr===""&&emailErr===""&&psdErr===""&&rpsdErr===""&&rpsd!==""){
        console.log(psd)
        const password = psd
        try {
          const res = await axios.post('http://localhost:3000/register', {
              name, email, password
          })

          setFsM(res.data.msg)
    
      } catch (err) {
          err.response.data.msg && 
          setFeM(err.response.data.msg)
      }
      }
    }
  
    return (
        <div>
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
    
                  <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                  <p className="text-danger mb-3">{feM}</p>
                  <p className="text-success mb-3">{fsM}</p>
    
                  <MDBInput wrapperClass='mb-4 w-100' label='Full Name' id='formControlLg' type='text' size="lg" onChange={onNameChange} value={name} />
                  <p className="text-danger mb-3">{nameErr}</p>
                  <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={onEmailChange} value={email} />
                  <p className="text-danger mb-3">{emailErr}</p>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={onPsdChange} value={psd} />
                  <p className="text-danger mb-3">{psdErr}</p>
                  <MDBInput wrapperClass='mb-4 w-100' label='Repeat Password' id='formControlLg' type='password' size="lg" onChange={onRpsdChange} value={rpsd} />
                  <p className="text-danger mb-3">{rpsdErr}</p>
  
    
                  <MDBBtn size='lg' onClick={handleSubmit}>
                    Register
                  </MDBBtn>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      </div>
      );
}

export default Register
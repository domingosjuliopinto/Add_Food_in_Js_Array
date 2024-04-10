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

function Register(){
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
    
                  <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                  <p className="text-white-50 mb-3">Please enter your login and password!</p>
    
                  <MDBInput wrapperClass='mb-4 w-100' label='Full Name' id='formControlLg' type='text' size="lg"/>
                  <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>
                  <MDBInput wrapperClass='mb-4 w-100' label='Repeat Password' id='formControlLg' type='password' size="lg"/>
  
    
                  <MDBBtn size='lg'>
                    Login
                  </MDBBtn>
    
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}

export default Register
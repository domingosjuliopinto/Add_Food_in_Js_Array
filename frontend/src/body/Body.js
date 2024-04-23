import Login from '../login/Login';
import Register from '../register/Register';
import Home from '../home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Body() {
  const Logged=localStorage.getItem('firstLogin')

  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={Logged?<Home />:<Login />} />
          <Route path="/homec" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default Body;

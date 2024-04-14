import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Success from './successpage/success';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Logged=localStorage.getItem('firstLogin')

  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={Logged?<Success />:<Login />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

import './App.css';
import Login from './login/Login';
import Register from './register/Register';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;

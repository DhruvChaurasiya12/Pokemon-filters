import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './Components/Navbar'
import Cards from './Components/Cards'
import Detail from './Components/Detail'
import Search from './Components/Search';
import Registration from './Components/Registration';
import Login from './Components/Login';


function App() {
  return (
    <Router>

    <div className='bg-blue-200'>
    <Navbar/>

      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    <ToastContainer />
  </div>
  </Router>

  )
}

export default App
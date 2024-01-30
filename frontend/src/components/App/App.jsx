import React, { useState } from 'react';
import './App.css'
import { Routes, Route, useParams } from 'react-router-dom'; 
import Layout from '../Layout/Layout';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';

function App() {
  
  return (
    <>
      {
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/home' element={<Home />}></Route> 
            <Route path='/login' element={<Login />}></Route> 
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      }
    </>
  )
}

export default App

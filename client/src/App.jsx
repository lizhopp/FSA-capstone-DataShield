import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import {Routes, Route} from 'react-router'


function App() {

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'



    
 



  return(
    <>
    <Navbar/>

    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
    </>
  )
}
export default App


import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Singup from './pages/singup'
import Login from './pages/login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/singup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
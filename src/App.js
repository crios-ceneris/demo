import './App.css';
import React from 'react'

// importamos páginas
import Login from "./pages/Login.js"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavbarComponent from './helpers/Navbar.js';
import TablaGestionarEquipos from './DataTables/TablaGestionarEquipos.js';

function App() {
  return(
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path='/table' element={<TablaGestionarEquipos/>}></Route>
      <Route path='/*' element={<NavbarComponent />}></Route>
    </Routes>
  )
}
export default App
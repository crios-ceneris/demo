import React from "react"
import {Route, Routes } from "react-router-dom"
import GestionarUsuarios from "../pages/Administrador/GestionarUsuarios.js"
import GestionarEquipos from "../pages/SoporteTecnico/GestionarEquipos.js"
import GenerarDiagnosticos from "../pages/SoporteTecnico/GenerarDiagnosticos.js"
import RevisarDiagnosticos from "../pages/SoporteTecnico/RevisarDiagnosticos.js"
import GestionarAlmacen from "../pages/Almacen/GestionarAlmacen.js"
import TablaGestionarEquipos from "../DataTables/TablaGestionarEquipos.js"

const CompRoutes = () => {
  return (
    <Routes>
      <Route path="/gestionar-usuarios" element={<GestionarUsuarios />}></Route>
      <Route path="/gestionar-equipos" element={<GestionarEquipos />}></Route>
      <Route path="/generar-diagnosticos" element={<GenerarDiagnosticos />}></Route>
      <Route path="/revisar-diagnosticos" element={<RevisarDiagnosticos />}></Route>
      <Route path="/gestionar-almacen" element={<GestionarAlmacen />}></Route>
      <Route path="/prueba-tabla" element={<TablaGestionarEquipos />}></Route>
    </Routes>
  )
}

export default CompRoutes
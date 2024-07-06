import React, { useState, useEffect} from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'

function GestionarUsuarios() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Lógica para validar autenticación y rol
  useEffect( () =>{
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/auth', { 
          withCredentials: true 
        })
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.log('el error es: '+error)
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate])

  if (isAuthenticated) {
    return(
      <div className='p-2'>
        {/* Título de la tabla */}
        <div className='d-grid gap-2'>
          <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Gestionar Usuarios</div>
        </div>
  
        {/* Tabla con datos */}
        <div>
  
        </div>
      </div>
    )
  } else {
    return <div>Cargando...</div>
  }
}

export default GestionarUsuarios

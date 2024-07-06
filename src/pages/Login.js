import React, { useState} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import './Login.css'

function Login (){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await Axios.post('http://localhost:3001/api/login', { username, password }, { 
        withCredentials: true 
      })
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        showConfirmButton: false,
        timer: 1000
      })
      navigate('/')
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Credenciales Incorrectas",
        showConfirmButton: false,
        timer: 1500
      })
      console.error('Error al iniciar sesión:', error);
      navigate('/')
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="container w-50">
      <div className="row align-items-center">
        <div className="col bg-transparent mx-5">
          <div className='card-group px-5'>
            <div className='card p-4'>
              <div className='card-body'>
                <h2>Iniciar Sesión</h2>
                <p className="text-secondary">Ingrese su usuario y contraseña</p>
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa-solid fa-user"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      value={username} onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={handleKeyDown}/>
                  </div>
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="inputGroup-sizing-default"><i className="fa-solid fa-key"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      value={password} onChange={(e) => setPassword(e.target.value)} 
                      onKeyDown={handleKeyDown}/>
                  </div>
                  <button className='btn btn-primary rounded-1' onClick={handleLogin}>Iniciar Sesión</button>
              </div>
            </div>
            <div className='card text-white bg-black py-5'>
              <div className='card-body text-center'>
                <br/>
                <img className='img-fluid'
                  src='https://ceneris.com/wp-content/uploads/2021/05/logo-ceneris-300.png'
                  alt='Logo'/>
                <br/><br/>
                <p className='fst-italic'> Versión 1.0 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
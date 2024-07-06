import React from 'react';

function RevisarDiagnosticos() {
  return(
    <div className='p-2'>
      {/* Título de la tabla */}
      <div className='d-grid gap-2'>
        <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Revisar Diagnósticos</div>
      </div>

      {/* Tabla con datos */}
      <div className='mt-4'>
        <div className='table-responsive'>
          <table className='table text-center'>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Equipo</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Fecha de Recepción</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Responsable</th>
                <th scope="col">Estado</th>
                <th scope="col">Diagnostico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Ceneris EIRL Proyecto Cerro Verde</td>
                <td>Bomba Gravimétrica</td>
                <td>SKC</td>
                <td>XR5000</td>
                <td>86303</td>
                <td>04/01/2024</td>
                <td>Muy Alta</td>
                <td>Técnico 1</td>
                <td>Enviado</td>
                <td>Revisar</td>
              </tr>
            </tbody>     
          </table>
        </div>
      </div>
    </div>
  )
}

export default RevisarDiagnosticos
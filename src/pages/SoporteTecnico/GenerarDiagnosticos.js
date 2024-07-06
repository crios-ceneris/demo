import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function GenerarDiagnosticos() {
  const [show, setShow] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState({});
  const [username, setUsername] = useState('');
  const [diagnosticsData, setDiagnosticsData] = useState([]);
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [show2, setShow2] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState({
    idmatrizequipos: '',
    fecharevision: '',
    estadorevision: '',
    diagnostico: '',
    fechamanufactura: '',
    ultimacalibracion: '',
    estadoingreso: '',
    observaciones: '',
    idusuariorealiza: '',
    descripcionfig3: '',
    descripcionfig2: '',
    descripcionfig1: '',
    urlfigura3: '',
    urlfigura2: '',
    urlfigura1: '',
    accesorios: '',
    usoaplicacion: ''

  });

  useEffect(() => {
    // Función para iniciar sesión y almacenar el nombre de usuario en localStorage
    const login = (username) => {
      localStorage.setItem('username', username);
      setUsername(username);
    };

    // Función para cargar datos
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/equipos');
        const data = await response.json();
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
        setDiagnosticsData(data);

        const responseResponsable = await fetch('http://localhost:3001/api/users');
        const dataResponsable = await responseResponsable.json();
        setUsers(dataResponsable);
      } catch (error) {
        console.error(error);
      }
    };

    // Llamada a la función fetchData
    fetchData();
  }, []);

  console.log('Username:', username);

  const handleClose = () => setShow(false);

  const handleClose2 = () => setShow2(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiagnosticData({
      ...diagnosticData,
      [name]: value
    });
  };

  const handleUserChange = (e) => {
    const { value } = e.target;
    setDiagnosticData({
      ...diagnosticData,
      idusuariorealiza: value
    });
  };


  const handleShow = (diagnostic) => {
    setSelectedEquipment(diagnostic);
    setShow(true);
    setDiagnosticData({
      ...diagnosticData,
      idmatrizequipos: diagnostic.id, // Agrega el ID del equipo al objeto de diagnóstico
      idusuariorealiza: '' // Reinicia el ID del usuario al mostrar el modal

    });
  };

  const handleShow2 = (diagnostic) => {
    setSelectedEquipment(diagnostic);
    setShow2(true);
    // Autocompletar los datos del equipo seleccionado en modo de edición
    setDiagnosticData({
      idmatrizequipos: diagnostic.id,
      equipo: diagnostic.equipo,
      marca: diagnostic.marca,
      modelo: diagnostic.modelo,
      serie: diagnostic.serie,
      fecharecepcion: diagnostic.fecharecepcion,
      accesorios: diagnostic.accesorios,
        usoaplicacion: diagnostic.usoaplicacion,
        estadoingreso: diagnostic.estadoingreso,
        diagnostico: diagnostic.diagnostico,
        fechamanufactura: diagnostic.fechamanufactura,
        ultimacalibracion: diagnostic.ultimacalibracion,
        observaciones: diagnostic.observaciones,
      fecharevision: diagnostic.fecharevision,
        idusuariorealiza: diagnostic.idusuariorealiza,
      descripcionfig1: diagnostic.descripcionfig1,
      descripcionfig2: diagnostic.descripcionfig2,
        descripcionfig3: diagnostic.descripcionfig3,
        urlfigura1: diagnostic.urlfigura1,
        urlfigura2: diagnostic.urlfigura2,
        urlfigura3: diagnostic.urlfigura3,

      // Autocompletar los demás campos del diagnóstico para edición
      ...diagnostic
    });
  };


  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3001/api/agregar-diagnostico', diagnosticData);
      console.log('Diagnóstico agregado correctamente');
      handleClose();
    } catch (error) {
      console.error('Error al agregar diagnóstico:', error);
    }
  };

  return (
      <div className='p-2'>
        {/* Tu código para mostrar la tabla de equipos */}
        <div className='d-grid gap-2'>
          <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Generar Diagnósticos</div>
        </div>

        <div className='mt-4'>
          <div className="input-group w-25 mb-4">
            <span className="input-group-text bg-success text-white">Responsable</span>
            <input type="text" className="form-control bg-light fw-medium" value={username} readOnly/>
          </div>
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
                <th scope="col">Diagnóstico</th>
                <th scope="col">Opciones</th>
                <th scope="col">Observaciones</th>
              </tr>
              </thead>
              <tbody>
              {diagnosticsData.map((diagnostic, index) => (
                  <tr key={index}>
                    <td>{diagnostic.id}</td>
                    <td>{diagnostic.cliente}</td>
                    <td>{diagnostic.equipo}</td>
                    <td>{diagnostic.marca}</td>
                    <td>{diagnostic.modelo}</td>
                    <td>{diagnostic.serie}</td>
                    <td>{new Date(diagnostic.fecharecepcion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</td>
                    <td>{diagnostic.prioridad}</td>
                    <td>{diagnostic.responsable}</td>
                    <td>{diagnostic.estadorevision}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => handleShow(diagnostic)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info"><i className="fa-solid fa-pen-to-square" onClick={()=> handleShow2(diagnostic)}></i></button>
                      <button className="btn btn-sm btn-danger"><i className="fa-solid fa-trash"></i></button>
                    </td>
                    <td>{diagnostic.Observaciones}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal para generar diagnóstico */}
        <Modal
            show={show}
            size='lg'
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Generar Diagnóstico</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className='w-100'>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="numerodiagnostico">Diagnóstico N°</span>
                    <input type="text" className="form-control" name="diagnosticNumber" value={selectedEquipment.id || ''} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="fechaRecepcion">Fecha Recepción</span>
                    <input type="text" className="form-control" name="fechaRecepcion" value={selectedEquipment.fecharecepcion ? new Date(selectedEquipment.fecharecepcion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} readOnly />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DATOS GENERALES</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="equipo">Equipo</label>
                    <input type="text" className="form-control" id="equipo" name="equipo" value={selectedEquipment.equipo || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" className="form-control" id="marca" name="marca" value={selectedEquipment.marca || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" className="form-control" id="modelo" name="modelo" value={selectedEquipment.modelo || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serie">Serie</label>
                    <input type="text" className="form-control" id="serie" name="serie" value={selectedEquipment.serie || ''} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Accesorios</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese accesorios"
                        name="accesorios"
                        value={diagnosticData.accesorios}
                        onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Uso/Aplicacion</Form.Label>
                  <Form.Control
                      type="text"
                      rows={3}
                      placeholder="Ingrese Uso"
                      name="usoaplicacion"
                      value={diagnosticData.usoaplicacion}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ESTADO DE INGRESO</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese estado de ingreso"
                      name="estadoingreso"
                      value={diagnosticData.estadoingreso}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DIAGNÓSTICO</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese diagnostico"
                      name="diagnostico"
                      value={diagnosticData.diagnostico}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaManufactura">Fecha Manufactura</span>
                    <Form.Control
                        type="date"
                        name="fechamanufactura"
                        value={diagnosticData.fechamanufactura}
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaCalibracion">Fecha Calibración</span>
                    <Form.Control
                        type="date"
                        name="ultimacalibracion"
                        value={diagnosticData.ultimacalibracion}
                        onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>RECOMENDACIONES / OBSERVACIONES</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese observaciones"
                      name="observaciones"
                      value={diagnosticData.observaciones}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaRevisión">Fecha Revisión</span>
                    <Form.Control
                        type="date"
                        name="fecharevision"
                        value={diagnosticData.fecharevision}
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="realizadoPor">Realizado por:</span>
                    <Form.Select
                        name="idusuariorealiza"
                        value={diagnosticData.idusuariorealiza || ''}
                        onChange={handleUserChange}
                    >
                      <option value="">Seleccionar</option>
                      {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ADJUNTOS</div>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 1"
                          name="descripcionfig1"
                          value={diagnosticData.descripcionfig1}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 2"
                          name="descripcionfig2"
                          value={diagnosticData.descripcionfig2}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 3"
                          name="descripcionfig3"
                          value={diagnosticData.descripcionfig3}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura1" placeholder='Figura 1'/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura2"/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura3"/>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para editar diagnóstico */}
        <Modal
            show={show2}
            size='lg'
            onHide={handleClose2}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Diagnóstico</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className='w-100'>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="numerodiagnostico">Diagnóstico N°</span>
                    <input type="text" className="form-control" name="diagnosticNumber" value={selectedEquipment.id || ''} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-3'>
                    <span className="input-group-text" id="fechaRecepcion">Fecha Recepción</span>
                    <input type="text" className="form-control" name="fechaRecepcion" value={selectedEquipment.fecharecepcion ? new Date(selectedEquipment.fecharecepcion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : ''} readOnly />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DATOS GENERALES</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="equipo">Equipo</label>
                    <input type="text" className="form-control" id="equipo" name="equipo" value={selectedEquipment.equipo || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" className="form-control" id="marca" name="marca" value={selectedEquipment.marca || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" className="form-control" id="modelo" name="modelo" value={selectedEquipment.modelo || ''} readOnly />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serie">Serie</label>
                    <input type="text" className="form-control" id="serie" name="serie" value={selectedEquipment.serie || ''} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Accesorios</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese accesorios"
                        name="accesorios"
                        value={diagnosticData.accesorios}
                        onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Uso/Aplicacion</Form.Label>
                  <Form.Control
                      type="text"
                      rows={3}
                      placeholder="Ingrese Uso"
                      name="usoaplicacion"
                      value={diagnosticData.usoaplicacion}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ESTADO DE INGRESO</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese estado de ingreso"
                      name="estadoingreso"
                      value={diagnosticData.estadoingreso}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>DIAGNÓSTICO</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese diagnostico"
                      name="diagnostico"
                      value={diagnosticData.diagnostico}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaManufactura">Fecha Manufactura</span>
                    <Form.Control
                        type="date"
                        name="fechamanufactura"
                        value={diagnosticData.fechamanufactura}
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaCalibracion">Fecha Calibración</span>
                    <Form.Control
                        type="date"
                        name="ultimacalibracion"
                        value={diagnosticData.ultimacalibracion}
                        onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>RECOMENDACIONES / OBSERVACIONES</div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Ingrese observaciones"
                      name="observaciones"
                      value={diagnosticData.observaciones}
                      onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="fechaRevisión">Fecha Revisión</span>
                    <Form.Control
                        type="date"
                        name="fecharevision"
                        value={diagnosticData.fecharevision}
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='input-group mb-2 mt-3'>
                    <span className="input-group-text" id="realizadoPor">Realizado por:</span>
                    <Form.Select
                        name="idusuariorealiza"
                        value={diagnosticData.idusuariorealiza || ''}
                        onChange={handleUserChange}
                    >
                      <option value="">Seleccionar</option>
                      {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ADJUNTOS</div>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 1"
                          name="descripcionfig1"
                          value={diagnosticData.descripcionfig1}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 2"
                          name="descripcionfig2"
                          value={diagnosticData.descripcionfig2}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          rows={3}
                          placeholder="Ingrese descripción de la figura 3"
                          name="descripcionfig3"
                          value={diagnosticData.descripcionfig3}
                          onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura1" placeholder='Figura 1'/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura2"/>
                  </div>
                  <div className="form-group mb-3">
                    <input className="form-control" type="file" id="figura3"/>
                  </div>
                </div>
              </div>


            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default GenerarDiagnosticos;

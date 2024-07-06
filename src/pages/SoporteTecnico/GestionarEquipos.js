import React, {useEffect, useState} from 'react'
import { Button, Modal, Form, ModalFooter } from 'react-bootstrap'
import Swal from 'sweetalert2'
import TablaGestionarEquipos from '../../DataTables/TablaGestionarEquipos.js'

function GestionarEquipos() {

  // Estados para el modal
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => {
    setShow2(false);
  }

  const handleShow = () => setShow(true);

  const handleShow2 = (index) => {
    console.log(equipoData);
    const selectedEquipo = equipoData[index];
    setEquipoEditado(selectedEquipo); // Establecer el equipo que se está editando
    setEditFormData({  // Establecer editFormData con los valores del equipo seleccionado
      servicio: selectedEquipo.servicio,
      cliente: selectedEquipo.cliente,
      numeroguia: selectedEquipo.numeroguia,
      equipo: selectedEquipo.equipo,
      marca: selectedEquipo.marca,
      modelo: selectedEquipo.modelo,
      serie: selectedEquipo.serie,
      accesorios: selectedEquipo.accesorios,
      fecharecepcion: selectedEquipo.fecharecepcion,
      prioridad: selectedEquipo.prioridad,
      responsable: selectedEquipo.responsable,
    });
    setShow2(true);
  };
  // Estado para almacenar datos de equipos
  const [equipoData, setEquipoData] = useState([]);
  const [responsableOpciones, setResponsableOpciones] = useState([]);

  // Estado para el equipo a editar
  const [equipoEditado, setEquipoEditado] = useState(null);

// Estado para almacenar los cambios realizados en el formulario de edición
  const [editFormData, setEditFormData] = useState({
    servicio: '',
    cliente: '',
    numeroguia: '',
    equipo: '',
    marca: '',
    modelo: '',
    serie: '',
    accesorios: '',
    fecharecepcion: '',
    prioridad: '',
    responsable: '',
  });

// Función para manejar cambios en el formulario de edición
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };




  // Estado para el nuevo equipo
  const [newEquipo, setNewEquipo] = useState({
    servicio: '',
    cliente: '',
    numeroguia: '',
    equipo: '',
    marca: '',
    modelo: '',
    serie: '',
    accesorios: '',
    fecharecepcion: '',
    prioridad: '',
    responsable: '',
  });

  // Función para manejar cambios en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEquipo({ ...newEquipo, [name]: value });
  };



  // Función para enviar datos a la API y agregar equipo
  const handleAddEquipo = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/agregar-equipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipo),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Equipo agregado correctamente');
        // Actualizar la lista de equipos
        fetchData();
        // Cerrar el modal
        handleClose();
        // Limpiar el estado del nuevo equipo
        setNewEquipo({
          servicio: '',
          cliente: '',
          numeroguia: '',
          serie: '',
          equipo: '',
          marca: '',
          modelo: '',
          accesorios: '',
          fecharecepcion: '',
          prioridad: '',
          responsable: '',
        });
      } else {
        console.error('Error al agregar equipo:', data.message);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al agregar equipo:', error);
      // Mostrar un mensaje de error al usuario
    }
  };


  const handleEditEquipo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/editar-equipo/${equipoEditado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Equipo editado correctamente');
        // Actualizar la lista de equipos
        fetchData();
        // Cerrar el modal
        handleClose2();
        // Limpiar el estado del equipo editado y los datos del formulario de edición
        setEquipoEditado(null);
        setEditFormData({
          servicio: '',
          cliente: '',
          numeroguia: '',
          serie: '',
          equipo: '',
          marca: '',
          modelo: '',
          accesorios: '',
          fecharecepcion: '',
          prioridad: '',
          responsable: '',
        });
      } else {
        console.error('Error al editar equipo:', data.message);
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error al editar equipo:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const handleEliminarEquipo = (id) => {
    // Mostrar ventana de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Agregar console.log para verificar el ID del equipo que se va a eliminar
        console.log('ID del equipo a eliminar:', id);

        // Eliminar el equipo si el usuario confirma
        fetch(`http://localhost:3001/api/eliminar-equipo/${id}`, {
          method: 'DELETE',
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Hubo un problema al eliminar el equipo');
              }
              return response.json();
            })
            .then(data => {
              console.log('Respuesta del servidor:', data);
              if (data.message === 'Equipo eliminado correctamente') {
                console.log('Equipo eliminado correctamente');
                // Actualizar el estado equipoData excluyendo el equipo eliminado
                setEquipoData(prevEquipoData => prevEquipoData.filter(equipo => equipo.id !== id));
              } else {
                console.error('Error al eliminar equipo:', data.message);
                // Mostrar mensaje de error solo cuando hay un problema al eliminar el equipo
                Swal.fire('Error', 'Hubo un problema al eliminar el equipo', 'error');
              }
            })
            .catch(error => {
              console.error('Error al eliminar equipo:', error);
              // Mostrar un mensaje de error al usuario
              Swal.fire('Error', 'Hubo un problema al eliminar el equipo', 'error');
            });
      }
    });
  };





  // Función para obtener datos de equipos
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/equipos');
      const data = await response.json();
      const responseResponsable = await fetch('http://localhost:3001/api/responsable');
        const dataResponsable = await responseResponsable.json();
      setEquipoData(data);
      setResponsableOpciones(dataResponsable);
    } catch (error) {
      console.error(error);
      // Mostrar un mensaje de error al usuario
    }
  };

  // Efecto para obtener datos al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);


  return(
    <div className='p-2'>
      {/* Título de la tabla */}
      <div className='d-grid gap-2'>
        <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Gestionar Equipos</div>
      </div>

      {/* Tabla con datos */}
      <div className='mt-4'>
        <div className="input-group w-25 mb-4">
          <button className='btn btn-success' type='button' onClick={handleShow}>Registrar Equipo</button>
        </div>
        {/* Tabla con datos 
        <div className='table-responsive'>
          <table className='table table-bordered text-center table-hover'>
            <thead className='table-primary'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Servicio</th>
                <th scope="col">Cliente</th>
                <th scope="col">#Guía</th>
                <th scope="col">Equipo</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Accesorios</th>
                <th scope="col">Fecha de Recepción</th>
                <th scope="col">Prioridad</th>
                <th scope="col">Responsable</th>
                <th scope="col">Diagnostico</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
            {equipoData.map((equipo, index) => (
                <tr key={index}>
                  <td>{equipo.id}</td>
                  <td>{equipo.servicio}</td>
                  <td>{equipo.cliente}</td>
                  <td>{equipo.numeroguia}</td>
                  <td>{equipo.equipo}</td>
                  <td>{equipo.marca}</td>
                  <td>{equipo.modelo}</td>
                  <td>{equipo.serie}</td>
                  <td>{equipo.accesorios}</td>
                  <td>{new Date(equipo.fecharecepcion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</td>
                  <td>{equipo.prioridad}</td>
                  <td>{equipo.responsable}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" ><i className="fa-solid fa-eye"></i></button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info" type='button' onClick={() => handleShow2(index)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminarEquipo(equipo.id)}><i
                        className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>*/}
      </div> 
      
      <TablaGestionarEquipos/>
      
      <div> {/* Formulario Modal para Registrar Equipos*/}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton className='text-bg-success'>
            <Modal.Title>Agregar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="w-100">
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Servicio:</Form.Label>
                    <Form.Select
                      name="servicio"
                      value={newEquipo.servicio}
                      onChange={handleChange}>
                      <option value="">Seleccione</option>
                      <option value="Local">Local</option>
                      <option value="Tercero">Tercero</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>#Guía:</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroguia"
                      value={newEquipo.numeroguia}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={newEquipo.cliente}
                    onChange={handleChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Serie:</Form.Label>
                    <Form.Control
                      type="text"
                      name="serie"
                      value={newEquipo.serie}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={newEquipo.marca}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Equipo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="equipo"
                      value={newEquipo.equipo}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={newEquipo.modelo}
                      onChange={handleChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Accesorios:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="accesorios"
                    value={newEquipo.accesorios}
                    onChange={handleChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Recepcion:</Form.Label>
                    <Form.Control type="date" name="fecharecepcion" value={newEquipo.fecharecepcion} onChange={handleChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Prioridad:</Form.Label>
                    <Form.Select name="prioridad" value={newEquipo.prioridad} onChange={handleChange}>
                      <option value="">Seleccione</option>
                      <option value="Muy Alta">Muy Alta</option>
                      <option value="Alta">Alta</option>
                      <option value="Normal">Normal</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Responsable:</Form.Label>
                    <Form.Select name="responsable" value={newEquipo.responsable} onChange={handleChange}>
                      <option value="">Seleccione</option>
                      {responsableOpciones.map((opcion) => (
                        <option key={opcion.id} value={opcion.id}>
                          {opcion.responsable}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleAddEquipo}>
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
        {/* Formulario Modal para Editar Equipos*/}
        <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false}>
          <Modal.Header closeButton className='text-bg-warning'>
            <Modal.Title>Editar Equipo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="w-100">
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Servicio:</Form.Label>
                    <Form.Select
                      name="servicio"
                      value={editFormData.servicio}
                      onChange={handleEditFormChange}>
                      <option value="">Seleccione</option>
                      <option value="Local">Local</option>
                      <option value="Tercero">Tercero</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>#Guía:</Form.Label>
                    <Form.Control
                      type="text"
                      name="numeroguia"
                      value={editFormData.numeroguia}
                      onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={editFormData.cliente}
                    onChange={handleEditFormChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Serie:</Form.Label>
                    <Form.Control
                      type="text"
                      name="serie"
                      value={editFormData.serie}
                      onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                      type="text"
                      name="marca"
                      value={editFormData.marca}
                      onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Equipo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="equipo"
                      value={editFormData.equipo}
                      onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="modelo"
                      value={editFormData.modelo}
                      onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Accesorios:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="accesorios"
                    value={editFormData.accesorios}
                    onChange={handleEditFormChange}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha Recepcion:</Form.Label>
                    <Form.Control type="date" name="fecharecepcion" value={editFormData.fecharecepcion} onChange={handleEditFormChange}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Prioridad:</Form.Label>
                    <Form.Select name="prioridad" value={editFormData.prioridad} onChange={handleEditFormChange}>
                      <option value="">Seleccione</option>
                      <option value="Muy Alta">Muy Alta</option>
                      <option value="Alta">Alta</option>
                      <option value="Normal">Normal</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Responsable:</Form.Label>
                    <Form.Select name="responsable" value={editFormData.responsable} onChange={handleEditFormChange}>
                      {responsableOpciones.map((opcion) => (
                        <option key={opcion.id} value={opcion.id}>
                          {opcion.responsable}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button variant="danger" onClick={handleClose2}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditEquipo}>
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default GestionarEquipos
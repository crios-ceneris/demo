import React, { useEffect, useReducer, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap'
import DataTable from "react-data-table-component"
import Axios from "axios"
import Swal from 'sweetalert2'

function TablaGestionarEquipos() {
  const [show, setShow] = useState(false)
  const [rowData, setRowData] = useState({})
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleEdit = (event) => {
    const row = parseInt(event.currentTarget.dataset.row, 10)
    const rowData = data.find((item) => item.id === row)
    setRowData(rowData)
    handleShow()
  }
  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '40px',
      wrap: true,
    },
    {
      name: 'Servicio',
      selector: row => row.servicio,
      width: '90px',
      wrap: true,
    },
    {
      name: 'Cliente',
      selector: row => row.cliente,
      width: '100px',
      wrap: true,
    },
    {
      name: '#Guía',
      selector: row => row.numeroguia,
      width: '80px',
      wrap: true,
    },
    {
      name: 'Equipo',
      selector: row => row.equipo,
      width: '120px',
      wrap: true,
    },
    {
      name: 'Marca',
      selector: row => row.marca,
      wrap: true,
    },
    {
      name: 'Modelo',
      selector: row => row.modelo,
      wrap: true,
    },
    {
      name: 'Serie',
      selector: row => row.serie,
      width: '80px',
      wrap: true,
    },
    {
      name: 'Accesorios',
      selector: row => row.accesorios,
      width: '200px',
      wrap: true,
    },
    {
      name: 'F. Recepción',
      selector: row => row.fecharecepcion,
      wrap: true,
    },
    {
      name: 'Prioridad',
      selector: row => row.prioridad,
      wrap: true,
    },
    {
      name: 'Responsable',
      selector: row => row.responsable,
      wrap: true,
    },
    {
      name: 'Diagnóstico',
      cell:(row) => (
        <button className="btn btn-primary btn-sm"><i className="fa-regular fa-eye"></i></button>
      )
    },
    {
      name: 'Opciones',
      cell:(row) => (
        <div>
          <button className="btn btn-info btn-sm" data-row={row.id} onClick={(event) => handleEdit(event)}><i className="fa-regular fa-pen-to-square"></i></button>
          <button className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></button>
        </div>
      )
    },
  ];

  const tableStyles = {
    headRow:{
      style: {
        justifyContent: "center",
      }
    },
    headCells:{
      style:{
        fontWeitgth: "bold",
        fontSize: "14px",
        justifyContent: "center",
        overflowX: "hidden",
        wrap: true,
        width: "100px",
        padding: "0 5px 0 5px",
      }
    },
    cells:{
      style:{
        justifyContent: "center",
        overflowX: "visible",
        textAlign: "center",
        padding: "0 5px 0 5px",
      }
    }
  }

  const[data, setData] = useState([])
  const[search, setSearch] = useState('')
  const[filter, setFilter] = useState([])
  const[dataUsers, setDataUsers] =  useState([])

  const handleSearch = (e) => {
    const searchText = e.target.value
    setSearch(searchText)

    if (searchText) {
      setFilter(
        data.filter((row) => {
          return Object.values(row)
          .join("").toLowerCase()
          .includes(searchText.toLowerCase())
        })
      )
    } else {
      setFilter(data)
    }
  }

  const handleSave = async() => {
    try {
      const editRowData = await Axios.put(`http://localhost:3001/api/editar-equipo/${rowData.id}`,{
        servicio: rowData.servicio,
        numeroguia: rowData.numeroguia,
        cliente: rowData.cliente,
        serie: rowData.serie,
        marca: rowData.marca,
        equipo: rowData.equipo,
        modelo: rowData.modelo,
        accesorios: rowData.accesorios,
        fecharecepcion: rowData.fecharecepcion,
        prioridad: rowData.prioridad,
        responsable: rowData.responsable,
      })
      if (editRowData.status === 200) {
        handleClose()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Los cambios se han guardado",
          showConfirmButton: false,
          timer: 1500
        })
        fetchData()
        setRowData(rowData)
      }
      else {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: "No ha sido posible guardar los cambios",
          showConfirmButton: false,
          timer: 1000
        })
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "errow",
        title: "Oops... ocurrio un error!",
        showConfirmButton: false,
        timer: 1000
      })
      console.error('Error al guardar los cambios: ', error)
    }
  }

  const fetchData = async() => {
    try {
      const backData = await Axios.get('http://localhost:3001/api/obtener-equipos')
      setData(backData.data)
      setFilter(backData.data)
    } catch (error) {
      console.error('Error al obtener datos', error)
    }
  }
  const fetchUserData = async() => {
    try {
      const dataUsers = await Axios.get('http://localhost:3001/api/users-names-data')
      setDataUsers(dataUsers.data)
    } catch (error) {
      console.error('Error al obtener usuarios', error)
    }
  }

  useEffect(() =>{
    fetchData()
    fetchUserData()
  }, [])

  return(
    <div>
      <DataTable
        customStyles={tableStyles}
        columns={columns}
        data={filter}
        responsive
        pagination
        subHeader
        subHeaderComponent={
          <input type="text" 
          className="w-25 form-control"
          placeholder="Buscar..."
          value={search}
          onChange={handleSearch}/>
        }/>

      {/* MODAL PARA EDITAR EQUIPO */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
                        value={rowData.servicio}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          servicio: e.target.value,
                        }))}>
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
                        value={rowData.numeroguia}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          numeroguia: e.target.value,
                        }))}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                      type="text"
                      name="cliente"
                      value={rowData.cliente}
                      onChange={(e) => setRowData((prevState) => ({
                        ...prevState,
                        cliente: e.target.value,
                      }))}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Serie:</Form.Label>
                    <Form.Control
                        type="text"
                        name="serie"
                        value={rowData.serie}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          serie: e.target.value,
                        }))}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Marca:</Form.Label>
                    <Form.Control
                        type="text"
                        name="marca"
                        value={rowData.marca}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          marca: e.target.value,
                        }))}/>
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
                        value={rowData.equipo}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          equipo: e.target.value,
                        }))}/>
                  </Form.Group>
                </div>
                <div className="col md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Modelo:</Form.Label>
                    <Form.Control
                        type="text"
                        name="modelo"
                        value={rowData.modelo}
                        onChange={(e) => setRowData((prevState) => ({
                          ...prevState,
                          modelo: e.target.value,
                        }))}/>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <Form.Group className="mb-3">
                  <Form.Label>Accesorios:</Form.Label>
                  <Form.Control
                      as="textarea"
                      name="accesorios"
                      value={rowData.accesorios}
                      onChange={(e) => setRowData((prevState) => ({
                        ...prevState,
                        accesorios: e.target.value,
                      }))}/>
                </Form.Group>
              </div>
              <div className="row">
                <div className="col md-6">
                  <Form.Group className="mb-3">
                  <Form.Label>Fecha Recepcion:</Form.Label>
                  <Form.Control type="date"
                    value={rowData.fecharecepcion}
                    onChange={(e) => setRowData((prevState) => ({
                      ...prevState,
                      fecharecepcion: e.target.value,
                    }))}/>
                </Form.Group>
                </div>
                <div className="col md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Prioridad:</Form.Label>
                  <Form.Select
                      name="prioridad"
                      value={rowData.prioridad}
                      onChange={(e) => setRowData((prevState) => ({
                        ...prevState,
                        prioridad: e.target.value,
                      }))}>
                    <option value="">Seleccione</option>
                    <option value="Muy Alta">Muy Alta</option>
                    <option valute="Alta">Alta</option>
                    <option value="Normal">Normal</option>
                  </Form.Select>
                </Form.Group>
                </div>
                <div className="col md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Responsable:</Form.Label>
                  <Form.Select
                      name="responsable"
                      value={rowData.responsable}
                      onChange={(e) => setRowData((prevState) => ({
                        ...prevState,
                        responsable: e.target.value,
                      }))}>
                      <option value="">Seleccione</option>
                      {dataUsers.map(item => (
                        <option value={item}>{item}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleSave}>
              Guardar
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default TablaGestionarEquipos
import React, { useState } from "react"
import Axios from "axios"
import { Button, Modal, Form, ModalFooter } from 'react-bootstrap'

function GestionarAlmacen() {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [descripcion, setDescripcion] = useState("")
  const [file, setFile] = useState()
  const [pathImage, setPathImage] = useState("")

  const sendImage = async() => {
    try {
      const reponse = await Axios.post("/api/upload", file)
      console.log(reponse.data)
    } catch (error) {
      console.error(error)
    }
  }

  const onFileChange = (e) => {
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if(file.type.includes("image")){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function load() {
          setPathImage(reader.result)
        }
        setFile(file)
        console.log(file)
      }else {
        console.log("Error")
      }
    }
  }
  

  return(
    <div className='p-2'>
      {/* Título de la tabla */}
      <div className='d-grid gap-2'>
        <div className='p-1 bg-primary rounded-2 text-center text-white fw-medium'>Gestionar Almacén</div>
      </div>

      {/* Tabla con datos */}
      <div className='mt-4'>
        <div className="input-group w-25 mb-4">
          <button className='btn btn-success' type='button' onClick={handleShow}>Subir Imagen</button>
        </div>
      </div>
      <div>
        <Modal show={show} size='lg' onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton className='text-bg-info'>
            <Modal.Title>Subir Imagen Prueba</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="w-100">
            <div className='p-1 mt-2 mb-2 bg-primary rounded-2 text-center text-white'>ADJUNTOS</div>
            <div><img className="img-fluid" src={pathImage}/></div>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          placeholder="Descripción de la figura 1"
                          name="descripcionfig1"
                          onChange={(e) => setDescripcion(e.value.target)}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <input 
                      className="form-control" 
                      type="file" 
                      id="figura1" 
                      placeholder='Figura 1' 
                      onChange={onFileChange}/>
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default GestionarAlmacen
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarCamara() {

  const navigate = useNavigate()

  const [camara, setCamara] = useState({
    marca: "",
    modelo: "",
    tipo: "",
    resolucionMP: "",
    grabaVideo: false,
    wifi: false,
    precio: ""
  })

  const [imagen, setImagen] = useState(null)

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setCamara({
      ...camara,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    // agregar todos los campos de la cámara
    Object.entries(camara).forEach(([key, value]) => {
      if (value !== "") {
        formData.append(key, value)
      }
    })

    // agregar imagen
    if (imagen) {
      formData.append("imagen", imagen)
    }

    try {
      await axios.post(
        "http://localhost:8080/cam-app/camaras",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      navigate("/")
    } catch (error) {
      console.error("Error al guardar cámara:", error)
      alert("Error al guardar la cámara")
    }
  }

  return (
    <div className="container">
      <div className="text-center my-4">
        <h3>Agregar Cámara</h3>
      </div>

      <form onSubmit={onSubmit}>

        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            name="marca"
            value={camara.marca}
            onChange={onInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            name="modelo"
            value={camara.modelo}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            name="tipo"
            value={camara.tipo}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Resolución (MP)</label>
          <input
            type="number"
            className="form-control"
            name="resolucionMP"
            value={camara.resolucionMP}
            onChange={onInputChange}
          />
          <small className="text-muted">
            Dejar vacío si es analógica (ej: Pentax K1000)
          </small>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="grabaVideo"
            checked={camara.grabaVideo}
            onChange={onInputChange}
          />
          <label className="form-check-label">Graba Video</label>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="wifi"
            checked={camara.wifi}
            onChange={onInputChange}
          />
          <label className="form-check-label">Wi-Fi</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            min="0"
            value={camara.precio}
            onChange={onInputChange}
            required
          />
        </div>

        {/* 🔽 NUEVO: CARGAR IMAGEN */}
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>

      </form>
    </div>
  )
}

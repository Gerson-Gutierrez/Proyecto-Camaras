import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditarCamara() {

  const urlBase = "http://localhost:8080/cam-app/camaras"
  const navigate = useNavigate()
  const { id } = useParams()

  /* ======================
     ESTADO
  ====================== */
  const [camara, setCamara] = useState({
    marca: "",
    modelo: "",
    tipo: "",
    resolucionMP: 0,
    grabaVideo: false,
    wifi: false,
    precio: 0
  })

  const [imagen, setImagen] = useState(null)

  /* ======================
     CARGAR CÁMARA
  ====================== */
  useEffect(() => {
    const cargarCamara = async () => {
      const res = await axios.get(`${urlBase}/${id}`)
      setCamara(res.data)
    }
    cargarCamara()
  }, [id])

  /* ======================
     INPUT CHANGE
  ====================== */
  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setCamara({
      ...camara,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value
    })
  }

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("marca", camara.marca)
    formData.append("modelo", camara.modelo)
    formData.append("tipo", camara.tipo)
    formData.append("resolucionMP", camara.resolucionMP)
    formData.append("grabaVideo", camara.grabaVideo)
    formData.append("wifi", camara.wifi)
    formData.append("precio", camara.precio)

    if (imagen) {
      formData.append("imagen", imagen)
    }

    try {
      await axios.put(`${urlBase}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      navigate("/")
    } catch (error) {
      console.error(error)
      alert("Error al editar la cámara")
    }
  }

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="container">

      <div className="text-center my-4">
        <h3>Editar Cámara</h3>
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

        {/* ✅ RESOLUCIÓN CORRECTA */}
        <div className="mb-3">
          <label className="form-label">Resolución (MP)</label>
          <input
            type="number"
            className="form-control"
            name="resolucionMP"
            min="0"
            value={camara.resolucionMP}
            onChange={onInputChange}
            required
          />
          <small className="text-muted">
            Usar 0 si es cámara analógica
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
          <label className="form-check-label">Graba video</label>
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
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  )
}

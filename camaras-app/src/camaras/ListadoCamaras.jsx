import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { Link } from 'react-router-dom'

export default function ListadoCamaras() {

  const urlBase = "http://localhost:8080/cam-app/camaras"
  const [camaras, setCamaras] = useState([])

  useEffect(() => {
    cargarCamaras()
  }, [])

  const cargarCamaras = async () => {
    try {
      const resultado = await axios.get(urlBase)
      setCamaras(resultado.data)
    } catch (error) {
      console.error("Error al cargar cámaras:", error)
    }
  }

  const eliminarCamara = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar esta cámara?")) {
      await axios.delete(`${urlBase}/${id}`)
      cargarCamaras()
    }
  }

  return (
    <div className="container">

      <div className="text-center my-4">
        <h3>Cámaras fotográficas</h3>
      </div>

      <div className="row">

        {camaras.map((camara) => (
          <div className="col-md-4 mb-4" key={camara.idCamara}>
            <div className="card h-100 shadow-sm">

              <img
                src={`http://localhost:8080${camara.imagenUrl}`}
                className="card-img-top"
                alt={camara.modelo}
                style={{
    height: "220px",
    objectFit: "contain",
    backgroundColor: "#f8f9fa"
  }}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {camara.marca} {camara.modelo}
                </h5>

                <p className="card-text mb-1">
                  <strong>Tipo:</strong> {camara.tipo}
                </p>

                <p className="card-text mb-1">
                  <strong>Resolución:</strong> {camara.resolucionMP} MP
                </p>

                <p className="card-text mb-1">
                  <strong>Video:</strong> {camara.grabaVideo ? "Sí" : "No"}
                </p>

                <p className="card-text mb-1">
                  <strong>Wi-Fi:</strong> {camara.wifi ? "Sí" : "No"}
                </p>

                <p className="card-text fs-5 fw-bold text-success">
                  <NumericFormat
                    value={camara.precio}
                    displayType="text"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </p>
              </div>

              <div className="card-footer text-center bg-white">
                <Link
                  to={`/editar/${camara.idCamara}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarCamara(camara.idCamara)}
                >
                  Eliminar
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}



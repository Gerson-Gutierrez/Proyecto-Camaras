import React from 'react'
import { Link } from 'react-router-dom'

export default function Navegacion() {
  return (
    <div className=''>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Camaras</Link>
 
 
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
        <Link className="nav-link" to="/agregar">Agregar Camaras</Link>
      </div>
  
  </div>
</nav>
    </div>
  );
}

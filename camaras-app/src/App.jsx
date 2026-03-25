import { useState } from 'react'
import ListadoCamaras from './camaras/ListadoCamaras';
import Navegacion from './plantilla/Navegacion';
import AgregarCamara from './camaras/AgregarCamara';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditarCamara from './camaras/EditarCamara';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
    <BrowserRouter>
    <Navegacion/>
    <Routes>
      <Route path='/' element={<ListadoCamaras/>}/>
      <Route path='/agregar' element={<AgregarCamara/>}/>
      <Route path='/editar/:id'element={<EditarCamara/>}/>
    </Routes>
    
    </BrowserRouter>
   </div>


  );
}

export default App

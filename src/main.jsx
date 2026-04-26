import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    {/*<Registro />  */} 
  </StrictMode>,
)

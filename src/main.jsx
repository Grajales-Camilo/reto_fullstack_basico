import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.jsx';
import FirebaseTest from './pages/FirebaseTest.jsx';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const currentPath = window.location.pathname.replace(basePath, '') || '/';
const CurrentPage = currentPath === '/test' ? FirebaseTest : Login;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentPage />
  </StrictMode>,
)

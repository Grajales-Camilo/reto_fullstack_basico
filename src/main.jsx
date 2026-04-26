import { StrictMode } from 'react'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/molecules/ProtectedRoute.jsx'
import Navbar from './components/organisms/Navbar.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Upload from './pages/Upload.jsx'
import { useAuthStore } from './store/useAuthStore';

function App() {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  return (
    <BrowserRouter basename="/reto_fullstack_basico/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

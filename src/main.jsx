import { StrictMode } from 'react'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import { useAuthStore } from './store/useAuthStore';

const getInitialPath = () => window.location.pathname || '/login';

function App() {
  const [path, setPath] = useState(getInitialPath);
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    initAuthListener();

    const handlePopState = () => setPath(getInitialPath());
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [initAuthListener]);

  if (path === '/register') {
    return <Registro navigate={navigate} />;
  }

  return <Login navigate={navigate} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

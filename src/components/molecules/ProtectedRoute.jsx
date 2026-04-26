import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function ProtectedRoute({ children, redirectTo = "/login" }) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-brand-dark">
        Validando sesión...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;

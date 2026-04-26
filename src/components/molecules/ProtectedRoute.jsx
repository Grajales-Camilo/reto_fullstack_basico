import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

function ProtectedRoute({ children, redirectTo = "/login" }) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!loading && !user && window.location.pathname !== redirectTo) {
      window.history.pushState({}, "", redirectTo);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [loading, redirectTo, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-brand-dark">
        Validando sesión...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}

export default ProtectedRoute;

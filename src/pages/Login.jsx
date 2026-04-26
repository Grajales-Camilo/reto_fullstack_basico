import { useState } from "react";
import { Link } from "react-router-dom";
import smile from "../assets/smile.png";
import { signInWithEmail, signOut } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";

function Login() {
  const user = useAuthStore((state) => state.user);
  const loadingSession = useAuthStore((state) => state.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await signInWithEmail(email, password);
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    setSubmitting(true);
    setError("");

    try {
      await signOut();
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-4">
            <img src={smile} alt="Icono de sonrisa" className="h-16 w-16" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-slate-800">
            ¡Bienvenido!
          </h1>
          <p className="text-lg text-slate-400">Inicia sesión en tu cuenta</p>
        </div>

        {user && (
          <div className="mb-8 rounded-dna border border-brand-border bg-gray-50 p-4 text-brand-dark">
            <p className="font-semibold">Sesión activa</p>
            <p className="break-all text-sm">{user.email}</p>
            <button
              className="mt-4 text-sm font-semibold text-brand-blue"
              disabled={submitting}
              onClick={handleSignOut}
              type="button"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="group relative">
            <label
              className="mb-1 block text-lg text-slate-400 transition-colors group-focus-within:text-blue-500"
              htmlFor="login-email"
            >
              Correo electrónico
            </label>
            <div className="relative border-b border-gray-200 transition-all group-focus-within:border-blue-500">
              <input
                autoComplete="email"
                className="w-full bg-transparent py-2 pr-10 text-slate-700 focus:outline-none"
                id="login-email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </div>
          </div>

          <div className="group relative">
            <label
              className="mb-1 block text-lg text-slate-400 transition-colors group-focus-within:text-blue-500"
              htmlFor="login-password"
            >
              Contraseña
            </label>
            <div className="relative border-b border-gray-200 transition-all group-focus-within:border-blue-500">
              <input
                autoComplete="current-password"
                className="w-full bg-transparent py-2 pr-10 text-slate-700 focus:outline-none"
                id="login-password"
                minLength="6"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                className="h-5 w-5 rounded border-gray-300 transition-all focus:ring-blue-500"
                type="checkbox"
              />
              <span className="text-lg">¿Recordarme?</span>
            </label>
            <button
              className="text-lg text-blue-500 transition-colors hover:text-blue-600"
              type="button"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            className="btn-dna w-3/5 py-4 text-xl font-bold"
            disabled={submitting || loadingSession}
            type="submit"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <Link
          className="mt-8 text-sm font-semibold text-brand-blue"
          to="/register"
        >
          Crear cuenta nueva
        </Link>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smile from "../assets/smile.png";
import { signUpWithEmail } from "../services/authService";
import { createUserProfile } from "../services/usersService";

function Registro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const user = await signUpWithEmail(email, password);
      await createUserProfile(user.uid, {
        name,
        email: user.email,
        createdAt: new Date(),
      });
      setMessage("Cuenta creada correctamente. Ya puedes iniciar sesión.");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
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
            Crear cuenta
          </h1>
          <p className="text-lg text-slate-400">Regístrate con tu correo</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="group relative">
            <label
              className="mb-1 block text-lg text-slate-400 transition-colors group-focus-within:text-blue-500"
              htmlFor="register-name"
            >
              Nombre
            </label>
            <div className="border-b border-gray-200 transition-all group-focus-within:border-blue-500">
              <input
                autoComplete="name"
                className="w-full bg-transparent py-2 text-slate-700 focus:outline-none"
                id="register-name"
                onChange={(event) => setName(event.target.value)}
                required
                type="text"
                value={name}
              />
            </div>
          </div>

          <div className="group relative">
            <label
              className="mb-1 block text-lg text-slate-400 transition-colors group-focus-within:text-blue-500"
              htmlFor="register-email"
            >
              Correo electrónico
            </label>
            <div className="border-b border-gray-200 transition-all group-focus-within:border-blue-500">
              <input
                autoComplete="email"
                className="w-full bg-transparent py-2 text-slate-700 focus:outline-none"
                id="register-email"
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
              htmlFor="register-password"
            >
              Contraseña
            </label>
            <div className="border-b border-gray-200 transition-all group-focus-within:border-blue-500">
              <input
                autoComplete="new-password"
                className="w-full bg-transparent py-2 text-slate-700 focus:outline-none"
                id="register-password"
                minLength="6"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </div>
          </div>

          {message && <p className="text-sm text-green-700">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            className="btn-dna w-3/5 py-4 text-xl font-bold"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Creando..." : "Registrarme"}
          </button>
        </form>

        <Link
          className="mt-8 text-sm font-semibold text-brand-blue"
          to="/login"
        >
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  );
}

export default Registro;

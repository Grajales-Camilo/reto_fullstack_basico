import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { signOut } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const items = useCartStore((state) => state.items);
  const cartItemsCount = items.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0,
  );

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-brand-border bg-white text-brand-dark">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="flex items-center gap-3 text-lg font-bold text-brand-blue"
          to="/"
        >
          <img
            alt="Logo MiniStore"
            className="h-10 w-10 rounded-dna object-contain"
            src={logo}
          />
          MiniStore
        </Link>

        <div className="flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link className="text-brand-dark hover:text-brand-blue" to="/">
            Home
          </Link>

          {user ? (
            <>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/cart"
              >
                Carrito ({cartItemsCount})
              </Link>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/orders"
              >
                Ver mis compras
              </Link>
              {role === "admin" && (
                <div className="flex flex-col gap-3 border-brand-border pt-3 sm:flex-row sm:items-center sm:gap-4 sm:border-l sm:pt-0 sm:pl-4">
                  <span className="w-fit rounded-dna bg-brand-blue px-2 py-1 text-xs font-bold text-white">
                    Admin
                  </span>
                  <Link
                    className="text-brand-dark hover:text-brand-blue"
                    to="/upload"
                  >
                    Subir imagen
                  </Link>
                  <Link
                    className="text-brand-dark hover:text-brand-blue"
                    to="/dollar"
                  >
                    Dólar hoy
                  </Link>
                </div>
              )}
              <button
                className="rounded-dna border border-brand-border px-4 py-2 text-brand-dark transition hover:border-brand-blue hover:text-brand-blue sm:w-auto"
                disabled={loading}
                onClick={handleSignOut}
                type="button"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/register"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

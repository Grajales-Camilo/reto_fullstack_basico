import { Link } from "react-router-dom";
import { signOut } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
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
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="text-lg font-bold text-brand-blue" to="/">
          MiniStore
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
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
              <button
                className="rounded-dna border border-brand-border px-4 py-2 text-brand-dark transition hover:border-brand-blue hover:text-brand-blue"
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

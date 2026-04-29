import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logo.png";
import { log } from "../../services/loggerService";
import { signOut } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";

function Navbar() {
  const { t, i18n } = useTranslation();
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
      <nav
        aria-label="Navegacion principal"
        className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
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
            {t("navbar.home")}
          </Link>

          {user ? (
            <>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/cart"
              >
                🛒 {t("navbar.cart")} ({cartItemsCount})
              </Link>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/orders"
              >
                🧾 {t("navbar.orders")}
              </Link>
              {role === "admin" && (
                <div className="flex flex-col gap-3 border-brand-border pt-3 sm:flex-row sm:items-center sm:gap-4 sm:border-l sm:pt-0 sm:pl-4">
                  <span className="w-fit rounded-dna bg-brand-blue px-2 py-1 text-xs font-bold text-white">
                    {t("navbar.admin")}
                  </span>
                  <Link
                    className="text-brand-dark hover:text-brand-blue"
                    to="/upload"
                  >
                    {t("navbar.upload")}
                  </Link>
                  <Link
                    className="text-brand-dark hover:text-brand-blue"
                    to="/dollar"
                  >
                    {t("navbar.dollar")}
                  </Link>
                </div>
              )}
              <button
                className="rounded-dna border border-brand-border px-4 py-2 text-brand-dark transition hover:border-brand-blue hover:text-brand-blue sm:w-auto"
                disabled={loading}
                onClick={handleSignOut}
                type="button"
              >
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/login"
              >
                {t("navbar.login")}
              </Link>
              <Link
                className="text-brand-dark hover:text-brand-blue"
                to="/register"
              >
                {t("navbar.register")}
              </Link>
            </>
          )}
          <select
            aria-label={t("language.selector")}
            className="rounded-dna border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-dark"
            onChange={(event) => {
              const next = event.target.value;
              log("info", "language_change", {
                from: i18n.resolvedLanguage,
                to: next,
              });
              i18n.changeLanguage(next);
            }}
            value={i18n.resolvedLanguage || i18n.language}
          >
            <option value="es">{t("language.spanish")}</option>
            <option value="en">{t("language.english")}</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

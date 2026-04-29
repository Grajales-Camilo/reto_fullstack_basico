import { useTranslation } from "react-i18next";
import ProductList from "../components/organisms/ProductList";
import { log } from "../services/loggerService";
import { useProductStore } from "../store/useProductStore";

function Home() {
  const { t } = useTranslation();
  const status = useProductStore((state) => state.status);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  const handleSearchChange = (event) => {
    const query = event.target.value;

    setSearchQuery(query);

    if (query.length >= 2 || query === "") {
      log("info", "product_search", { query });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("home.title")}</h1>
            <p className="mt-2 max-w-2xl text-brand-muted">
              {t("home.subtitle")}
            </p>
          </div>

          <label className="w-full md:max-w-sm">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              {t("home.searchLabel")}
            </span>
            <input
              className="input-dna bg-white disabled:cursor-not-allowed disabled:opacity-50"
              disabled={status === "loading"}
              onChange={handleSearchChange}
              placeholder={t("home.searchPlaceholder")}
              type="search"
              value={searchQuery}
            />
            <span
              aria-live="polite"
              className="mt-2 block min-h-5 text-sm text-brand-muted"
            >
              {searchQuery.length === 1 ? t("validations.searchMin") : ""}
            </span>
          </label>
        </div>

        <ProductList />
      </section>
    </main>
  );
}

export default Home;

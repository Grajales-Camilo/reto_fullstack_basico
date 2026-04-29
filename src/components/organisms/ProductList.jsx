import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../molecules/ProductCard";
import { useProductStore } from "../../store/useProductStore";

const PRODUCTS_PER_PAGE = 6;

function ProductList() {
  const { t } = useTranslation();
  const products = useProductStore((state) => state.products);
  const status = useProductStore((state) => state.status);
  const errorMessage = useProductStore((state) => state.errorMessage);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const currentPage = useProductStore((state) => state.currentPage);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const setPage = useProductStore((state) => state.setPage);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  if (status === "loading") {
    return (
      <div
        aria-live="polite"
        className="flex items-center justify-center py-12"
        role="status"
      >
        <svg
          aria-hidden="true"
          className="h-10 w-10 animate-spin text-brand-blue"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 0 1 8-8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
        <span className="sr-only">{t("products.loading")}</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        aria-live="assertive"
        className="rounded-dna border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
        role="alert"
      >
        {t("products.errorPrefix")}: {errorMessage}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm text-brand-muted">
          {t("products.found", { count: filteredProducts.length })}
        </p>
        <p className="text-sm text-brand-muted">
          {t("products.page", {
            current: safeCurrentPage,
            total: totalPages,
          })}
        </p>
      </div>

      {paginatedProducts.length === 0 ? (
        <p className="text-brand-muted">{t("products.empty")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          className="rounded-dna border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark disabled:opacity-40"
          disabled={safeCurrentPage === 1}
          onClick={() => setPage(safeCurrentPage - 1)}
          type="button"
        >
          {t("pagination.previous")}
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              className={`rounded-dna border px-4 py-2 text-sm font-semibold ${
                page === safeCurrentPage
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-brand-border text-brand-dark"
              }`}
              key={page}
              onClick={() => setPage(page)}
              type="button"
            >
              {page}
            </button>
          ),
        )}

        <button
          className="rounded-dna border border-brand-border px-4 py-2 text-sm font-semibold text-brand-dark disabled:opacity-40"
          disabled={safeCurrentPage === totalPages}
          onClick={() => setPage(safeCurrentPage + 1)}
          type="button"
        >
          {t("pagination.next")}
        </button>
      </div>
    </section>
  );
}

export default ProductList;

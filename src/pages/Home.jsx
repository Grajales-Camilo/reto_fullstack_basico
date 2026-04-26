import ProductList from "../components/organisms/ProductList";
import { useProductStore } from "../store/useProductStore";

function Home() {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Galería de productos</h1>
            <p className="mt-2 max-w-2xl text-brand-muted">
              Productos cargados desde Firestore con búsqueda y paginación local.
            </p>
          </div>

          <label className="w-full md:max-w-sm">
            <span className="mb-2 block text-sm font-semibold text-brand-dark">
              Buscar producto
            </span>
            <input
              className="input-dna bg-white"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Nombre, descripción o categoría"
              type="search"
              value={searchQuery}
            />
          </label>
        </div>

        <ProductList />
      </section>
    </main>
  );
}

export default Home;

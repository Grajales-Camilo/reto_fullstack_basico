import { useEffect, useState } from "react";
import { updateProductImage } from "../services/productsService";
import { uploadProductImage } from "../services/storageService";
import { useProductStore } from "../store/useProductStore";

function Upload() {
  const products = useProductStore((state) => state.products);
  const loadingProducts = useProductStore((state) => state.loading);
  const productsError = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");
    setImageUrl("");

    try {
      const uploadedImageUrl = await uploadProductImage(file, selectedProductId);
      await updateProductImage(selectedProductId, uploadedImageUrl);
      setImageUrl(uploadedImageUrl);
      setMessage("Imagen subida correctamente.");
      setFile(null);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Subir imagen</h1>
          <p className="mt-3 text-brand-muted">
            Sube una imagen a Firebase Storage y asóciala a un producto.
          </p>
        </div>

        <form
          className="space-y-6 rounded-dna border border-brand-border bg-white p-6"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Producto</span>
            <select
              className="input-dna bg-white"
              disabled={loadingProducts}
              onChange={(event) => setSelectedProductId(event.target.value)}
              required
              value={selectedProductId}
            >
              <option value="">
                {loadingProducts ? "Cargando productos..." : "Selecciona un producto"}
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Imagen</span>
            <input
              accept="image/*"
              className="input-dna bg-white"
              onChange={(event) => setFile(event.target.files[0] ?? null)}
              required
              type="file"
            />
          </label>

          {productsError && <p className="text-sm text-red-600">{productsError}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm font-semibold text-green-700">{message}</p>}

          <button
            className="btn-dna"
            disabled={submitting || loadingProducts || !selectedProductId || !file}
            type="submit"
          >
            {submitting ? "Subiendo..." : "Subir imagen"}
          </button>
        </form>

        {imageUrl && (
          <div className="mt-8 rounded-dna border border-brand-border bg-white p-6">
            <h2 className="text-xl font-bold">Imagen subida</h2>
            <a
              className="mt-3 block break-all text-sm font-semibold text-brand-blue"
              href={imageUrl}
              rel="noreferrer"
              target="_blank"
            >
              {imageUrl}
            </a>
            <img
              alt="Preview de la imagen subida"
              className="mt-6 max-h-96 w-full rounded-dna object-contain"
              src={imageUrl}
            />
          </div>
        )}
      </section>
    </main>
  );
}

export default Upload;

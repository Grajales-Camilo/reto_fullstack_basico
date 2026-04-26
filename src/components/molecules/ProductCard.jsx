import toast from "react-hot-toast";
import { useCartStore } from "../../store/useCartStore";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const productImage = product.imageUrl || product.image;
  const priceInCop = product.price * 3600;
  const formattedUsdPrice = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(product.price);
  const formattedCopPrice = new Intl.NumberFormat("es-CO", {
    currency: "COP",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(priceInCop);

  const handleAddToCart = () => {
    addItem({ ...product, image: productImage });
    toast.success(`Agregado: ${product.name}`);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-dna border border-brand-border bg-white">
      <div className="flex aspect-square items-center justify-center bg-gray-50 p-6">
        <img
          alt={product.name}
          className="h-full max-h-48 w-full object-contain"
          src={productImage}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-sm font-semibold uppercase text-brand-blue">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-brand-dark">{product.name}</h3>
        <p className="line-clamp-3 text-sm text-brand-muted">
          {product.description}
        </p>
        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-muted">
              🇺🇸 {formattedUsdPrice}
            </p>
            <p className="text-lg font-bold text-brand-dark">
              🇨🇴 {formattedCopPrice}
            </p>
          </div>
          <button
            className="btn-dna w-full px-4 py-2 text-sm sm:w-auto"
            onClick={handleAddToCart}
            type="button"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

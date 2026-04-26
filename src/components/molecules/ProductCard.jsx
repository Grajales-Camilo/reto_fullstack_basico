import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import { useSettingsStore } from "../../store/useSettingsStore";

function ProductCard({ product }) {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);
  const usdToCop = useSettingsStore((state) => state.usdToCop);
  const productImage = product.imageUrl || product.image;
  const priceInCop = product.price * usdToCop;
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
    if (!user) {
      toast("Iniciá sesión para agregar productos al carrito");
      return;
    }

    addItem({ ...product, image: productImage });
    toast.success(`Agregado: ${product.name}`);
  };

  const handleImageMouseMove = (event) => {
    if (!isImageZoomed) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-dna border border-brand-border bg-white">
      <button
        aria-label={
          isImageZoomed
            ? `Reducir imagen de ${product.name}`
            : `Ampliar imagen de ${product.name}`
        }
        className={`flex aspect-square items-center justify-center overflow-hidden bg-gray-50 p-6 ${
          isImageZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}
        onClick={() => setIsImageZoomed((currentValue) => !currentValue)}
        onMouseMove={handleImageMouseMove}
        type="button"
      >
        <img
          alt={product.name}
          className="h-full max-h-48 w-full object-contain transition-transform duration-200"
          src={productImage}
          style={{
            transform: isImageZoomed ? "scale(2)" : "scale(1)",
            transformOrigin: zoomOrigin,
          }}
        />
      </button>

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

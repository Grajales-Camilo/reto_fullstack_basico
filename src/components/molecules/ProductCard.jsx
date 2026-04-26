function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    currency: "COP",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(product.price);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-dna border border-brand-border bg-white">
      <div className="flex aspect-square items-center justify-center bg-gray-50 p-6">
        <img
          alt={product.name}
          className="h-full max-h-48 w-full object-contain"
          src={product.image}
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
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-brand-dark">{formattedPrice}</p>
          <button className="btn-dna px-4 py-2 text-sm" type="button">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

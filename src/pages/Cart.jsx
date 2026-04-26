import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  maximumFractionDigits: 0,
  style: "currency",
});
const COP_EXCHANGE_RATE = 3600;

function Cart() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = items.reduce(
    (accumulator, item) =>
      accumulator + item.price * COP_EXCHANGE_RATE * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Carrito</h1>
          <p className="mt-3 text-brand-muted">
            Revisa tus productos antes de continuar con el checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-dna border border-brand-border bg-white p-6">
            <p className="text-brand-muted">Tu carrito está vacío.</p>
            <button
              className="btn-dna mt-6"
              onClick={() => navigate("/")}
              type="button"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  className="grid gap-4 rounded-dna border border-brand-border bg-white p-4 md:grid-cols-[96px_1fr_auto]"
                  key={item.id}
                >
                  <img
                    alt={item.name}
                    className="h-24 w-24 rounded-dna object-contain"
                    src={item.image}
                  />

                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="mt-1 text-brand-muted">
                      {currencyFormatter.format(item.price * COP_EXCHANGE_RATE)}
                    </p>
                    <button
                      className="mt-3 text-sm font-semibold text-red-600"
                      onClick={() => removeItem(item.id)}
                      type="button"
                    >
                      Quitar
                    </button>
                  </div>

                  <label className="w-28">
                    <span className="mb-2 block text-sm font-semibold">
                      Cantidad
                    </span>
                    <input
                      className="input-dna bg-white"
                      min="1"
                      onChange={(event) =>
                        updateQuantity(item.id, event.target.value)
                      }
                      type="number"
                      value={item.quantity}
                    />
                  </label>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-4 rounded-dna border border-brand-border bg-white p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-brand-blue">
                  Total
                </p>
                <p className="text-2xl font-bold">
                  {currencyFormatter.format(total)}
                </p>
              </div>

              <button
                className="btn-dna"
                onClick={() => navigate("/checkout")}
                type="button"
              >
                Ir a Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;

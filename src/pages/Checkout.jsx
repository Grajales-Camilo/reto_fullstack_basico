import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/ordersService";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  maximumFractionDigits: 0,
  style: "currency",
});

function Checkout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const total = items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0,
  );

  const handleConfirmOrder = async () => {
    setSubmitting(true);
    setSuccessMessage("");
    setError("");

    try {
      await createOrder({
        items,
        total,
        userId: user.uid,
      });
      clearCart();
      setSuccessMessage("Compra confirmada correctamente.");
    } catch (orderError) {
      setError(orderError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="mt-3 text-brand-muted">
            Confirma tu orden para guardarla en Firestore.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-dna border border-brand-border bg-white p-6">
            <p className="text-brand-muted">
              No hay productos en el carrito para confirmar.
            </p>
            {successMessage && (
              <p className="mt-4 text-sm font-semibold text-green-700">
                {successMessage}
              </p>
            )}
            <button
              className="btn-dna mt-6"
              onClick={() => navigate("/")}
              type="button"
            >
              Volver a productos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-dna border border-brand-border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Resumen de la orden</h2>

              <div className="divide-y divide-brand-border">
                {items.map((item) => (
                  <div
                    className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                    key={item.id}
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-brand-muted">
                        {item.quantity} x {currencyFormatter.format(item.price)}
                      </p>
                    </div>
                    <p className="font-bold">
                      {currencyFormatter.format(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-6">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-2xl font-bold">
                  {currencyFormatter.format(total)}
                </p>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              className="btn-dna"
              disabled={submitting}
              onClick={handleConfirmOrder}
              type="button"
            >
              {submitting ? "Confirmando..." : "Confirmar compra"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Checkout;

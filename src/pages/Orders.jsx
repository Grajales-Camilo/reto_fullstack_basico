import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/ordersService";
import { useAuthStore } from "../store/useAuthStore";

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatDate(createdAt) {
  const date = createdAt?.toDate ? createdAt.toDate() : null;

  if (!date) {
    return "Fecha pendiente";
  }

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function Orders() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError("");

      try {
        const userOrders = await getOrdersByUser(user.uid);
        setOrders(userOrders);
      } catch (ordersError) {
        setError(ordersError.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user.uid]);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mis compras</h1>
          <p className="mt-3 text-brand-muted">
            Historial de órdenes guardadas en Firestore.
          </p>
        </div>

        {loading && <p className="text-brand-muted">Cargando compras...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && orders.length === 0 && (
          <div className="rounded-dna border border-brand-border bg-white p-6">
            <p className="text-brand-muted">Todavía no tienes compras.</p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <article
              className="rounded-dna border border-brand-border bg-white p-6"
              key={order.id}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-brand-blue">
                    Orden
                  </p>
                  <p className="break-all text-sm text-brand-muted">
                    {order.id}
                  </p>
                </div>
                <p className="text-sm text-brand-muted">
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="mt-4 divide-y divide-brand-border">
                {order.items.map((item) => (
                  <div
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                    key={item.id}
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-brand-muted">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-right text-xl font-bold">
                {currencyFormatter.format(order.total)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Orders;

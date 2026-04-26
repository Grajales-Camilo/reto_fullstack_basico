import { useState } from "react";
import toast from "react-hot-toast";
import { useSettingsStore } from "../store/useSettingsStore";

function DollarRate() {
  const usdToCop = useSettingsStore((state) => state.usdToCop);
  const updateRate = useSettingsStore((state) => state.updateRate);
  const [value, setValue] = useState(usdToCop);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await updateRate(value);
      toast.success("Tasa del dólar actualizada.");
    } catch (rateError) {
      setError(rateError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dólar hoy</h1>
          <p className="mt-3 text-brand-muted">
            Actualiza la tasa usada para convertir precios USD a COP.
          </p>
        </div>

        <form
          className="space-y-6 rounded-dna border border-brand-border bg-white p-6"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-sm font-semibold uppercase text-brand-blue">
              Tasa actual
            </p>
            <p className="mt-1 text-2xl font-bold">
              1 USD = {usdToCop.toLocaleString("es-CO")} COP
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Nueva tasa USD a COP
            </span>
            <input
              className="input-dna bg-white"
              min="1"
              onChange={(event) => setValue(event.target.value)}
              required
              type="number"
              value={value}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button className="btn-dna" disabled={submitting} type="submit">
            {submitting ? "Guardando..." : "Guardar tasa"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default DollarRate;

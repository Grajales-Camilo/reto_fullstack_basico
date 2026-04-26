import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const testCollection = collection(db, "_test");

function formatTimestamp(value) {
  if (!value) return "Sin fecha";
  if (typeof value.toDate === "function") return value.toDate().toLocaleString();
  if (value instanceof Date) return value.toLocaleString();
  return String(value);
}

function FirebaseTest() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDocuments = async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(testCollection);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDocuments(items);
      setMessage(`Documentos leidos: ${items.length}`);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWrite = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await addDoc(testCollection, {
        test: true,
        ts: new Date(),
      });

      setMessage("Documento escrito en Firestore.");
      await loadDocuments();
    } catch (writeError) {
      setError(writeError.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 text-brand-dark">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Prueba de Firebase</h1>
        <p className="mb-6 text-brand-muted">
          Esta vista temporal valida escritura y lectura real en Firestore.
        </p>

        <button
          className="btn-dna"
          disabled={loading}
          onClick={handleWrite}
          type="button"
        >
          {loading ? "Procesando..." : "Escribir en Firestore"}
        </button>

        {message && <p className="mt-4 text-sm text-brand-dark">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Documentos en _test</h2>

          {documents.length === 0 ? (
            <p className="text-brand-muted">No hay documentos para mostrar.</p>
          ) : (
            <ul className="space-y-3">
              {documents.map((document) => (
                <li
                  className="rounded-dna border border-brand-border bg-white p-4"
                  key={document.id}
                >
                  <p className="font-semibold">ID: {document.id}</p>
                  <p>test: {String(document.test)}</p>
                  <p>ts: {formatTimestamp(document.ts)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default FirebaseTest;

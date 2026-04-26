import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const ordersCollection = collection(db, "orders");

export async function createOrder({ items, total, userId }) {
  const documentRef = await addDoc(ordersCollection, {
    items,
    total,
    userId,
    createdAt: serverTimestamp(),
  });

  return documentRef.id;
}

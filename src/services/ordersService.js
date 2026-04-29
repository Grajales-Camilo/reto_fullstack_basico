import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
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

export async function getOrdersByUser(userId) {
  const ordersQuery = query(ordersCollection, where("userId", "==", userId));
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs
    .map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }))
    .sort((firstOrder, secondOrder) => {
      const firstDate = firstOrder.createdAt?.toMillis?.() ?? 0;
      const secondDate = secondOrder.createdAt?.toMillis?.() ?? 0;

      return secondDate - firstDate;
    });
}

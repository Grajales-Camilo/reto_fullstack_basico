import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const productsCollection = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((productDoc) => ({
    id: productDoc.id,
    ...productDoc.data(),
  }));
}

export async function addProduct(data) {
  const documentRef = await addDoc(productsCollection, data);
  return documentRef.id;
}

export async function updateProduct(id, data) {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, data);
}

export async function deleteProduct(id) {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}

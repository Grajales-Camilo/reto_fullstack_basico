import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const exchangeRateRef = doc(db, "settings", "exchange_rate");

export async function getExchangeRate() {
  const snapshot = await getDoc(exchangeRateRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data().usdToCop;
}

export async function setExchangeRate(value) {
  await setDoc(exchangeRateRef, { usdToCop: value }, { merge: true });
}

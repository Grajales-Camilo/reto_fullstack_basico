import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";

export async function signUpWithEmail(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

export async function signInWithEmail(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

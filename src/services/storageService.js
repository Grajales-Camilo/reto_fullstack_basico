import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadProductImage(file, productId) {
  const imageRef = ref(storage, `products/${productId}/${file.name}`);
  await uploadBytes(imageRef, file);

  return getDownloadURL(imageRef);
}

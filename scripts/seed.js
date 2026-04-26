import "dotenv/config";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const requiredEnvVars = Object.entries(firebaseConfig).filter(
  ([, value]) => !value,
);

if (requiredEnvVars.length > 0) {
  const missingKeys = requiredEnvVars.map(([key]) => key).join(", ");
  throw new Error(`Faltan variables de entorno Firebase: ${missingKeys}`);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    name: "Fjallraven Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Morral resistente para uso diario y viajes cortos.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    stock: 12,
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Camiseta casual de ajuste delgado para hombre.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    stock: 25,
  },
  {
    name: "Mens Cotton Jacket",
    price: 55.99,
    description: "Chaqueta de algodon para clima fresco.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    stock: 10,
  },
  {
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description: "Prenda casual de ajuste delgado para hombre.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    stock: 18,
  },
  {
    name: "John Hardy Women's Legends Bracelet",
    price: 695,
    description: "Pulsera para mujer con acabado premium.",
    category: "jewelery",
    image:
      "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    stock: 5,
  },
  {
    name: "Solid Gold Petite Micropave",
    price: 168,
    description: "Anillo delicado con diseno micropave.",
    category: "jewelery",
    image:
      "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    stock: 8,
  },
  {
    name: "White Gold Plated Princess",
    price: 9.99,
    description: "Anillo con acabado en oro blanco.",
    category: "jewelery",
    image:
      "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    stock: 30,
  },
  {
    name: "Pierced Owl Rose Gold Plated Earrings",
    price: 10.99,
    description: "Aretes en tono oro rosa para uso diario.",
    category: "jewelery",
    image:
      "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    stock: 20,
  },
  {
    name: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    description: "Disco duro externo portable de 2TB.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    stock: 14,
  },
  {
    name: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109,
    description: "Unidad SSD interna de 1TB para mejorar rendimiento.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    stock: 9,
  },
];

async function seedProducts() {
  const productsCollection = collection(db, "products");

  for (const product of products) {
    const documentRef = await addDoc(productsCollection, product);
    console.log(`Producto creado: ${documentRef.id} - ${product.name}`);
  }

  console.log(`Seed completado: ${products.length} productos insertados.`);
}

seedProducts().catch((error) => {
  console.error("Error ejecutando seed:", error);
  process.exit(1);
});

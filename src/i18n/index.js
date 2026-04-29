import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      "navbar.home": "Home",
      "navbar.cart": "Carrito",
      "navbar.orders": "Ver mis compras",
      "navbar.login": "Login",
      "navbar.register": "Registro",
      "navbar.logout": "Cerrar sesión",
      "navbar.upload": "Subir imagen",
      "navbar.dollar": "Dólar hoy",
      "navbar.admin": "Admin",
      "home.title": "Galería de productos",
      "home.subtitle":
        "Productos cargados desde Firestore con búsqueda y paginación local.",
      "home.searchLabel": "Buscar producto",
      "home.searchPlaceholder": "Nombre, descripción o categoría",
      "products.empty": "No hay productos para mostrar.",
      "products.loading": "Cargando productos",
      "products.errorPrefix": "Error",
      "products.found": "{{count}} productos encontrados",
      "products.page": "Página {{current}} de {{total}}",
      "pagination.previous": "Anterior",
      "pagination.next": "Siguiente",
      "language.selector": "Idioma",
      "language.spanish": "Español",
      "language.english": "Inglés",
    },
  },
  en: {
    translation: {
      "navbar.home": "Home",
      "navbar.cart": "Cart",
      "navbar.orders": "My orders",
      "navbar.login": "Login",
      "navbar.register": "Register",
      "navbar.logout": "Sign out",
      "navbar.upload": "Upload image",
      "navbar.dollar": "Dollar rate",
      "navbar.admin": "Admin",
      "home.title": "Product gallery",
      "home.subtitle":
        "Products loaded from Firestore with search and local pagination.",
      "home.searchLabel": "Search product",
      "home.searchPlaceholder": "Name, description or category",
      "products.empty": "No products to show.",
      "products.loading": "Loading products",
      "products.errorPrefix": "Error",
      "products.found": "{{count}} products found",
      "products.page": "Page {{current}} of {{total}}",
      "pagination.previous": "Previous",
      "pagination.next": "Next",
      "language.selector": "Language",
      "language.spanish": "Spanish",
      "language.english": "English",
    },
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  lng: "es",
  resources,
});

export default i18n;

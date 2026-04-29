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
      "cart.title": "Carrito",
      "cart.subtitle": "Revisa tus productos antes de continuar con el checkout.",
      "cart.remove": "Quitar",
      "cart.quantity": "Cantidad",
      "cart.total": "Total",
      "cart.goToCheckout": "Ir a Checkout",
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
      "validations.searchMin":
        "Escribe al menos 2 caracteres para buscar mejor",
      "validations.searchNoResults":
        'No se encontraron productos para "{{query}}"',
      "validations.cartEmpty":
        "Tu carrito está vacío. Agrega productos desde la galería.",
      "validations.goToGallery": "Ir a la galería",
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
      "cart.title": "Cart",
      "cart.subtitle": "Review your products before continuing to checkout.",
      "cart.remove": "Remove",
      "cart.quantity": "Quantity",
      "cart.total": "Total",
      "cart.goToCheckout": "Go to checkout",
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
      "validations.searchMin": "Type at least 2 characters for better search",
      "validations.searchNoResults": 'No products found for "{{query}}"',
      "validations.cartEmpty":
        "Your cart is empty. Add products from the gallery.",
      "validations.goToGallery": "Go to gallery",
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

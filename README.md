# Reto Desarrollador Fullstack

Reto para practicar las habilidades de un desarrollador fullstack moderno.

## Enunciado

Desarrollar una aplicación web fullstack para una tienda online que consuma una API REST. La aplicación debe incluir las siguientes funcionalidades:

- **Registro de usuarios y manejo de sesión**: Usar Firebase Authentication o localStorage (opcional para persistencia).
- **Galería de productos**: Poblada dinámicamente mediante peticiones a la API REST usando fetch o Axios.
- **Paginación de productos**: Implementar paginación eficiente en la galería.
- **Buscador de productos**: Funcionalidad de búsqueda en tiempo real.
- **Carrito de compras**: Gestión del carrito con estado local o en Firebase.
- **Previsualización de checkout**: Vista previa del proceso de compra.

El ejercicio debe tener un mínimo de 30 commits. Se evaluarán:

- Buenas prácticas de programación
- Limpieza y organización del código
- Diseño responsivo para dispositivos móviles y desktop
- Funcionamiento correcto
- Interfaz de usuario moderna y accesible
- Uso de componentes reutilizables y atomic design

Se permite reutilizar código de internet, citando las fuentes. El trabajo es individual.

## Tecnologías Requeridas

- **Frontend**: React con Tailwind CSS para estilos.
- **Gestión de estado y persistencia**: Zustand (recomendado) o Context API con localStorage.
- **API**: Usar https://fakestoreapi.com/ para datos de productos y usuarios (perfecta para ecommerce).
- **Backend (Bonus)**: Firebase (Authentication, Firestore) para estudiantes que quieran ir más allá.

## Instrucciones Paso a Paso

### Paso 1: Selecciona una Plantilla de Referencia
- Visita https://themewagon.com/ y busca una plantilla de tienda online (ecommerce template).
- Descarga una plantilla que te guste (puede ser gratuita).
- Estudia su estructura HTML, estilos CSS y diseño responsivo.
- **Nota**: La plantilla es solo referencia. Construirás tu proyecto en React desde cero usando la plantilla como inspiración visual.
- Primer commit: "docs: template de referencia seleccionada"

### Paso 2: Configuración del Proyecto
- Crea un nuevo proyecto con `npm create vite@latest -- --template react` o `npx create-react-app`.
- Instala las dependencias necesarias:
  ```bash
  npm install tailwindcss zustand axios
  ```
- Configura Tailwind CSS en tu proyecto.
- Primer commit: "feat: proyecto inicial con React y Tailwind"

### Paso 3: Crear Datos Simulados (Mockdata)
- Crea una carpeta `src/mockdata/` con archivos para datos de ejemplo.
- Define mockdata para:
  - **Productos**: `products.js` (lista de productos con id, nombre, precio, descripción, imagen)
  - **Usuarios**: `users.js` (lista de usuarios de ejemplo)
  - **Categorías**: `categories.js` (lista de categorías de productos)
- Ejemplo estructura:
  ```javascript
  // src/mockdata/products.js
  export const mockProducts = [
    { id: 1, name: 'Producto 1', price: 29.99, description: '...', category: 'electronics' },
    // más productos...
  ];
  ```
- Commits: "feat: mockdata de productos", "feat: mockdata de usuarios"

### Paso 4: Estructura de Componentes (Atomic Design)
- Crea la estructura de carpetas siguiendo atomic design:
  ```
  src/
  ├── components/
  │   ├── atoms/       (botones, inputs, badges)
  │   ├── molecules/   (cards de producto, form de búsqueda)
  │   ├── organisms/   (header, footer, galería)
  │   └── templates/   (layouts de páginas)
  ├── pages/
  ├── mockdata/
  ├── store/           (Zustand stores)
  └── styles/
  ```
- Crea componentes básicos:
  - `atoms/Button.jsx`
  - `atoms/Input.jsx`
  - `molecules/ProductCard.jsx`
  - `organisms/Header.jsx`
  - `organisms/Footer.jsx`
- Commits: "feat: estructura de componentes atómicos", "feat: componentes molecules", "feat: componentes organisms"

### Paso 5: Gestión de Estado con Zustand
- Crea `src/store/productStore.js` para gestionar:
  - Lista de productos
  - Productos filtrados
  - Búsqueda activa
- Crea `src/store/cartStore.js` para gestionar:
  - Items del carrito
  - Total del carrito
  - Funciones para agregar/quitar productos
- Ejemplo estructura:
  ```javascript
  // src/store/productStore.js
  import { create } from 'zustand';
  
  export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    // más acciones...
  }));
  ```
- Implementa persistencia en localStorage usando `zustand` middleware.
- Commits: "feat: store de productos con Zustand", "feat: store del carrito con persistencia"

### Paso 6: Galería de Productos con Mockdata
- Crea el componente `organisms/ProductGallery.jsx`.
- Usa mockdata para llenar la galería inicialmente.
- Muestra productos en grid responsivos usando Tailwind (cards con imagen, nombre, precio).
- Agrega evento "Agregar al carrito" que actualice el store.
- Commits: "feat: galería de productos", "feat: integración con store de productos"

### Paso 7: Carrito de Compras
- Crea el componente `organisms/ShoppingCart.jsx`.
- Muestra items del carrito desde el store de Zustand.
- Implementa botones para aumentar/disminuir cantidad y eliminar productos.
- Calcula y muestra el total automáticamente.
- Commits: "feat: vista del carrito", "feat: funcionalidad de carrito completa"

### Paso 8: Implementar Búsqueda de Productos
- Agrega un input de búsqueda en el Header.
- Filtra productos en mockdata basado en término de búsqueda.
- Actualiza la galería en tiempo real mientras se escribe.
- Commits: "feat: búsqueda de productos", "feat: búsqueda en tiempo real"

### Paso 9: Paginación
- Divide la galería de productos en páginas (ej: 6-8 productos por página).
- Agrega componentes de navegación (botones anterior/siguiente, números de página).
- Commits: "feat: paginación de productos"

### Paso 10: Registro y Sesión de Usuarios
- Crea formulario de registro usando mockdata de usuarios.
- Implementa almacenamiento de sesión actual en el store (Zustand + localStorage).
- Muestra nombre del usuario logueado en el Header.
- Agrega opción de logout.
- Commits: "feat: registro de usuarios", "feat: sesión de usuario con persistencia"

### Paso 11: Previsualización de Checkout
- Crea una nueva página/vista pour review antes de compra.
- Muestra resumen del carrito, datos del usuario, total a pagar.
- Agrega botón para confirmar compra (limpia carrito al confirmar).
- Commits: "feat: previsualización de checkout"

### Paso 12: Diseño Responsivo Completo
- Verifica que toda la aplicación funcione en:
  - Desktop (1920px+)
  - Tablet (768px - 1024px)
  - Móvil (320px - 767px)
- Usa Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`.
- Commits: "fix: responsive design en móvil", "fix: responsive design en tablet"

### Paso 13: Conectar API Real (Opcional)
- Una vez que todo funciona con mockdata, reemplaza con la API real: https://fakestoreapi.com/
- Endpoints disponibles:
  - `GET /products` - Obtener todos los productos
  - `GET /products/{id}` - Obtener producto específico
  - `GET /products/category/{categoryName}` - Productos por categoría
  - `GET /products/categories` - Obtener lista de categorías
  - `GET /users` - Obtener usuarios (para simulación de registro/sesión)
  - `GET /carts` - Obtener carritos (opcional)
- Usa `axios` o `fetch` para peticiones HTTP.
- Reemplaza gradualmente las llamadas en tus stores (productStore.js, userStore.js).
- Commits: "feat: integración con FakeStore API", "refactor: reemplazar mockdata con endpoints reales"

### Paso 14: Firebase (BONUS)
- Si quieres ir más allá, integra Firebase:
  - Authentication para registro/login más robusto.
  - Firestore para persistencia en la nube.
  - Almacenar historial de compras del usuario.
- Commits: "feat: integración con Firebase Authentication", "feat: Firestore para persistencia"

### Paso 15: Pruebas y Deploy
- Prueba toda la funcionalidad en diferentes navegadores.
- Optimiza imágenes y bundle size.
- Deploy en Vercel o Netlify.
- Commits: "fix: optimización de rendimiento", "chore: deploy a producción"

## Tips Importantes

✅ **Comienza con mockdata**: Así estableces la estructura y lógica sin depender de la API.
✅ **Usa Zustand**: Simplifica la gestión de estado comparado con Context API.
✅ **Commits frecuentes**: Cada paso pequeño merecería su commit (mínimo 30 commits).
✅ **Testing visual**: Prueba en diferentes tamaños de pantalla mientras desarrollas.
✅ **Firebase es bonus**: Enfócate primero en que todo funcione con localStorage.

## Información de Interés

- **Documentación de React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Zustand (State Management)**: https://zustand.docs.pmnd.rs/
- **Plantillas de Referencia**: https://themewagon.com/
- **FakeStore API**: https://fakestoreapi.com/ (API perfecta para ecommerce)
- **Firebase (Bonus)**: https://firebase.google.com/docs
- **Atomic Design**: https://bradfrost.com/blog/post/atomic-web-design/
- **Diseño Responsivo**: https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design
- **Axios (HTTP client)**: https://axios-http.com/
- **Vite (Build tool)**: https://vitejs.dev/


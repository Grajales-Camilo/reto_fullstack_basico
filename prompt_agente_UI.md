# Prompt para Agente — Taller 3 UNIMINUTO: Arquitectura, Eventos y Asincronía (React)

## 1. Identidad y contexto del proyecto

Sos un agente de desarrollo asistiendo a Camilo Grajales en la evolución de su app e-commerce React para cumplir los requisitos del Taller 3 de UNIMINUTO. La app ya está construida, desplegada y funcional. Tu trabajo es agregar capas técnicas encima de lo que existe — no reescribir nada que ya funcione.

**Repositorio:** https://github.com/Grajales-Camilo/reto_fullstack_basico (rama master)
**Deploy en vivo:** https://grajales-camilo.github.io/reto_fullstack_basico/
**Ruta local:** D:\Usuario\AppWebs\UPB - Desarrollo Web\Reto-React-final
**IDE:** VS Code con Claude Code for VS Code

---

## 2. Stack y arquitectura existente

### Stack instalado
- React 19.2.4, Vite 8.0.4, Tailwind v4.2.2 (@tailwindcss/vite)
- Zustand 5.0.12, Axios 1.15.0
- React Router DOM 7, Firebase 12
- react-hot-toast 2.6.0
- gh-pages (devDependency)
- dotenv (devDependency, solo para scripts Node)

### Arquitectura declarada: MVVM

| Capa MVVM   | Equivalente en el proyecto                                                                 |
|-------------|--------------------------------------------------------------------------------------------|
| **Model**   | `src/services/` — firebase.js, productsService.js, ordersService.js, settingsService.js, etc. |
| **ViewModel** | `src/store/` — useAuthStore.js, useProductStore.js, useCartStore.js, useSettingsStore.js |
| **View**    | `src/components/` y `src/pages/` — todo lo visual                                         |

Esta arquitectura ya existe implícitamente. El taller exige documentarla y hacerla explícita con las nuevas piezas que se agreguen.

### Estructura de carpetas existente
```
src/
├── components/
│   ├── atoms/
│   ├── molecules/       ← ProtectedRoute.jsx, ProductCard.jsx
│   ├── organisms/       ← ProductList.jsx, Navbar.jsx
│   └── templates/
├── pages/               ← Home, Login, Registro, Cart, Checkout, Orders, Upload, DollarRate
├── store/               ← useAuthStore, useProductStore, useCartStore, useSettingsStore
├── services/            ← firebase.js, authService, productsService, usersService,
│                           ordersService, storageService, settingsService
├── hooks/
├── mockdata/
└── styles/
scripts/
└── seed.js
```

### Firestore — colecciones activas
- `products` — 10 documentos con campos: name, price, description, category, image, imageUrl, stock
- `users` — por uid, campo role ('user' | 'admin')
- `orders` — por compra confirmada (items, total, userId, createdAt)
- `settings/exchange_rate` — campo usdToCop

### Funcionalidades ya implementadas — NO tocar sin instrucción explícita de Camilo
- Auth completa (registro, login, logout, recuperación de contraseña)
- Galería con búsqueda en tiempo real, paginación, zoom en imágenes
- Carrito con persistencia localStorage
- Checkout → escribe en Firestore colección orders
- Historial de órdenes (/orders)
- Subida de imágenes a Firebase Storage (/upload, solo admin)
- Tasa de cambio USD/COP configurable (/dollar, solo admin)
- Navbar con roles (admin vs usuario)
- Deploy en GitHub Pages con gh-pages
- Precios en USD y COP con tasa desde Firestore

---

## 3. Objetivo del taller y qué hay que construir

El Taller 3 exige aplicar sobre el prototipo existente los elementos descritos a continuación. Implementalos **en orden**, **sin romper nada que ya funcione**, y con **un commit atómico por paso**.

---

### 3.1 — Manejo explícito de estados de UI

**Problema actual:** Los estados de carga pueden ser implícitos o manejados con booleanos sueltos. El taller exige estados formalizados y feedback visual claro.

**Estados requeridos:** `'idle'` | `'loading'` | `'success'` | `'error'`

**Qué hacer:**
1. Verificar el estado actual de `useProductStore.js`. Si ya tiene un campo `status` o `loading`, evaluar si cumple. Si no, agregar un campo `status` con los cuatro valores.
2. Mostrar un **spinner o skeleton visible** en `ProductList.jsx` o `Home.jsx` mientras `status === 'loading'`.
3. Mostrar un **mensaje de error visible** (no solo consola) cuando `status === 'error'`. El mensaje debe tener `role="alert"` para accesibilidad.
4. El input de búsqueda en Home.jsx debe aparecer deshabilitado (atributo `disabled` y estilo visual atenuado) mientras `status === 'loading'` en el fetch inicial de productos. La búsqueda es en tiempo real con onChange, no hay botón Buscar.
5. Agregar `aria-live="polite"` al contenedor donde aparecen los mensajes de estado.

**Archivos a tocar:** `src/store/useProductStore.js`, el componente que renderiza la lista (verificar si es `ProductList.jsx`, `Home.jsx` o ambos).

---

### 3.2 — Logging de eventos

**Qué hacer:**
1. Crear `src/services/loggerService.js` — módulo singleton. Exportar dos funciones:
   - `log(event, data)` — escribe en consola con formato `[LOG][ISO_timestamp][event] data` y acumula la entrada en un array interno.
   - `getLogs()` — devuelve el array acumulado (para exportar al informe).
2. En `src/main.jsx` (o el entry point), exponer el logger en window para poder consultarlo desde la consola del navegador durante las mediciones del informe:
   ```js
   import { getLogs } from './services/loggerService';
   window.__appLogs = getLogs;
   ```
3. Integrar llamadas a `log()` en los siguientes puntos del flujo:

   | Evento                         | Dónde integrar                          | Datos a logear                              |
   |-------------------------------|------------------------------------------|---------------------------------------------|
   | App iniciada                  | `main.jsx` o `App.jsx`                   | `{ timestamp }`                             |
   | Búsqueda ejecutada            | handler de búsqueda en el store o componente | `{ term, resultCount, timestamp }`      |
   | Producto seleccionado         | onClick de ProductCard o similar         | `{ productId, productName, timestamp }`    |
   | Producto agregado al carrito  | acción addToCart de useCartStore         | `{ productId, timestamp }`                 |
   | Checkout confirmado           | acción de confirmación en Checkout.jsx   | `{ total, itemCount, timestamp }`          |
   | Error capturado               | bloques catch existentes                 | `{ errorType, message, timestamp }`        |

4. No agregar logging en bucles ni en renders — solo en eventos de usuario y en operaciones async (inicio y resultado).

---

### 3.3 — Internacionalización (i18n) — mínimo 2 idiomas

**Librería:** react-i18next. Verificar si ya está en `package.json`. Si no está, instalar:
```bash
npm install react-i18next i18next
```

**Idiomas:** Español (`es`) — predeterminado — e Inglés (`en`).

**Implementación:**

1. Crear `src/i18n/index.js` — inicialización de i18next con:
   - `lng: 'es'`
   - `fallbackLng: 'es'`
   - recursos inline (no archivos externos — más simple para el deploy en GitHub Pages)
   - interpolación con `escapeValue: false`

2. Los recursos de traducción van en el mismo `src/i18n/index.js`, con esta estructura mínima:

   ```js
   const resources = {
     es: {
       translation: {
         // Navbar
         "nav.home": "Inicio",
         "nav.cart": "Carrito",
         "nav.orders": "Mis compras",
         "nav.login": "Iniciar sesión",
         "nav.logout": "Cerrar sesión",
         "nav.register": "Registrarse",
         // Búsqueda
         "search.placeholder": "Buscar productos...",
         "search.button": "Buscar",
         "search.minChars": "Ingresá al menos 2 caracteres",
         "search.noResults": "No se encontraron productos para \"{{term}}\"",
         // Estados
         "status.loading": "Cargando productos...",
         "status.error": "Error al cargar los productos. Intentá de nuevo.",
         // Carrito
         "cart.empty": "Tu carrito está vacío",
         "cart.total": "Total",
         "cart.checkout": "Confirmar compra",
         // Detalle de producto
         "product.addToCart": "Agregar al carrito",
         "product.price": "Precio",
         "product.stock": "Stock disponible",
         // Checkout
         "checkout.confirm": "Confirmar orden",
         "checkout.success": "¡Orden confirmada!",
         "checkout.viewOrders": "Ver mis compras",
       }
     },
     en: {
       translation: {
         "nav.home": "Home",
         "nav.cart": "Cart",
         "nav.orders": "My orders",
         "nav.login": "Log in",
         "nav.logout": "Log out",
         "nav.register": "Register",
         "search.placeholder": "Search products...",
         "search.button": "Search",
         "search.minChars": "Enter at least 2 characters",
         "search.noResults": "No products found for \"{{term}}\"",
         "status.loading": "Loading products...",
         "status.error": "Failed to load products. Please try again.",
         "cart.empty": "Your cart is empty",
         "cart.total": "Total",
         "cart.checkout": "Checkout",
         "product.addToCart": "Add to cart",
         "product.price": "Price",
         "product.stock": "Stock available",
         "checkout.confirm": "Confirm order",
         "checkout.success": "Order confirmed!",
         "checkout.viewOrders": "View my orders",
       }
     }
   };
   ```

3. Importar e inicializar en `src/main.jsx` (o en un archivo separado que se importe ahí):
   ```js
   import './i18n/index';
   ```

4. Agregar un **selector de idioma en el Navbar** — botón simple `ES | EN`. Al hacer clic llama a `i18n.changeLanguage('en')` o `i18n.changeLanguage('es')`.
   - **ATENCIÓN:** El Navbar ya tiene lógica de roles. Hacé un commit del estado actual del Navbar ANTES de modificarlo. Verificar navegación como admin y como usuario-no-admin después del cambio.

5. Reemplazar strings hardcoded en los componentes del alcance mínimo (Navbar, barra de búsqueda, botones principales, mensajes de estado, etiquetas del carrito) usando el hook `useTranslation` de react-i18next:
   ```js
   const { t } = useTranslation();
   // uso: <button>{t('search.button')}</button>
   ```

**Regla importante:** No traducir datos de Firestore (nombres de productos, categorías, precios). Solo la UI.

---

### 3.4 — Validaciones inline en la búsqueda

La búsqueda actual filtra en tiempo real. Agregar estas validaciones con mensajes visibles (no toasts):

1. Si el campo tiene menos de 2 caracteres y el usuario presiona Enter o el botón Buscar: mostrar mensaje inline debajo del campo usando la clave `"search.minChars"` del i18n.
2. Si la búsqueda activa no devuelve resultados: mostrar mensaje en el área de resultados usando la clave `"search.noResults"` con interpolación del término buscado.
3. Verificar si ya existe un mensaje de "carrito vacío" en `Cart.jsx`. Si existe, agregar la clave i18n `"cart.empty"`. Si no existe, crearlo.

---

### 3.5 — Accesibilidad básica

**Qué hacer:**
1. Verificar que todos los `<input>` tienen `aria-label` o `<label>` explícitamente asociado con `htmlFor`.
2. Verificar que las imágenes de productos tienen `alt` descriptivo con el nombre del producto. Reemplazar cualquier `alt=""` o `alt="image"` o `alt="product"` genérico.
3. Verificar que el foco es visible al navegar con Tab. Si algún componente tiene `outline-none` sin reemplazo, agregar un outline accesible de Tailwind (ej: `focus-visible:ring-2`).
4. El contenedor de mensajes de estado (loading/error) debe tener `role="status"` o `role="alert"` según corresponda, más `aria-live="polite"`.
5. **Documentar en comentario en el código** qué se encontró y qué se corrigió — Camilo necesita esa información para el informe. No es necesario llegar a score perfecto en Lighthouse.

---

### 3.6 — Pruebas automatizadas

**Paso previo obligatorio:** Revisar `package.json` para detectar si Vitest y @testing-library/react ya están instalados. Si no están, instalar:
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

**Configurar Vitest en `vite.config.js`:**
```js
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/__tests__/setup.js',
}
```

**Crear `src/__tests__/setup.js`:**
```js
import '@testing-library/jest-dom';
```

**Agregar script en `package.json`:**
```json
"test": "vitest"
```

---

**Prueba unitaria 1 — `src/__tests__/loggerService.test.js`:**
Verificar que:
- `log('test_event', { x: 1 })` agrega una entrada al log interno
- `getLogs()` devuelve un array con esa entrada
- Cada entrada tiene los campos: `event`, `data`, `timestamp`

**Prueba unitaria 2 — `src/__tests__/i18n.test.js`:**
Verificar que:
- El recurso `es` contiene la clave `"search.button"` con valor `"Buscar"`
- El recurso `en` contiene la clave `"search.button"` con valor `"Search"`
- Las claves del objeto `es` y `en` son idénticas (no faltan traducciones en ninguno)

**Prueba de interfaz — `src/__tests__/SearchFlow.test.jsx`:**
Verificar que:
- El componente de búsqueda (campo + botón) renderiza sin errores
- Al escribir en el campo de búsqueda, el valor del input cambia (userEvent.type)
- Si se escribe menos de 2 caracteres y se hace clic en Buscar, aparece el mensaje de validación

**Nota sobre mocks:** La prueba de interfaz no debe hacer requests reales a Firebase. Mockear el store de productos con una lista fija de productos en memoria. Si la búsqueda dispara una llamada a Firestore (en lugar de filtrar localmente), reportarlo a Camilo antes de escribir el test.

---

## 4. Flujo de interacción documentado (Fase 1 del taller)

El flujo oficial del prototipo es:
```
búsqueda → lista → detalle/selección → confirmación
```

Mapeado a la app:
1. **Búsqueda:** usuario escribe en el campo → filtrado en tiempo real → evento: `onChange` (o `onSubmit` si hay botón)
2. **Lista:** galería de productos filtrados → estados: `'idle'` | `'loading'` | `'success'` | `'error'`
3. **Detalle/selección:** clic en producto → zoom o modal de detalle → evento: `onClick`
4. **Confirmación:** agregar al carrito → ir a checkout → confirmar orden → toast de confirmación → escribe en Firestore

Eventos principales: `onChange` (búsqueda), `onClick` (selección y carrito), `onSubmit` (checkout), `onAuthStateChanged` (sesión Firebase — asincrónico).

Asincronía presente: carga inicial de productos (Firestore read), confirmación de orden (Firestore write), carga de tasa de cambio (Firestore read al inicio).

---

## 5. Orden de construcción (commits atómicos)

| Paso | Qué construir                                                                 | Mensaje de commit sugerido                                         |
|------|-------------------------------------------------------------------------------|--------------------------------------------------------------------|
| 0    | Auditar package.json, stores y componentes existentes. No escribir código.    | `chore: auditoría inicial para taller 3`                           |
| 1    | Instalar dependencias faltantes (Vitest + Testing Library + react-i18next)    | `chore: instala dependencias para tests e i18n`                    |
| 2    | Estados explícitos en useProductStore + spinner/error en UI                   | `feat: estados de UI explícitos en useProductStore`                |
| 3    | loggerService.js con log() y getLogs() + exposición en window.__appLogs       | `feat: implementa loggerService singleton`                         |
| 4    | Integrar loggerService en búsqueda, selección, carrito y checkout             | `feat: integra logging en flujo búsqueda-carrito-checkout`        |
| 5    | src/i18n/index.js con recursos es/en + inicialización en main.jsx             | `feat: configura i18n con react-i18next`                          |
| 6    | **Commit de seguridad del Navbar antes de modificarlo**                       | `chore: snapshot navbar antes de agregar i18n`                     |
| 7    | Selector de idioma en Navbar + reemplazar strings en alcance mínimo           | `feat: agrega selector de idioma y traduce UI principal`           |
| 8    | Validaciones inline en búsqueda (< 2 chars, sin resultados, carrito vacío)    | `feat: validaciones inline en búsqueda y carrito`                  |
| 9    | Correcciones de accesibilidad (aria-label, alt, aria-live, focus visible)     | `fix: mejoras de accesibilidad en inputs, imágenes y estados`      |
| 10   | Configurar Vitest en vite.config.js + setup.js                                | `chore: configura vitest con jsdom`                                |
| 11   | Test unitario 1: loggerService                                                | `test: prueba unitaria de loggerService`                           |
| 12   | Test unitario 2: recursos i18n                                                | `test: prueba unitaria de recursos de traducción`                  |
| 13   | Test de interfaz: SearchFlow                                                  | `test: prueba de interfaz del flujo de búsqueda`                   |
| 14   | Verificar npm run build y npm test antes del deploy                           | `chore: verificación pre-deploy`                                   |
| 15   | npm run deploy                                                                | `chore: deploy taller 3 a GitHub Pages`                            |

---

## 6. Restricciones operativas

- **No reescribir** componentes que ya funcionan. Extender, no reemplazar.
- **No tocar** la lógica de Firebase Auth, las reglas de Firestore, ni el seed.
- **No agregar** librerías de UI externas (no instalar Radix, Shadcn, Headless UI, etc.)
- **No traducir** datos de Firestore: nombres de productos, categorías, precios.
- **No mover archivos** de carpeta sin instrucción explícita de Camilo — puede romper imports en toda la app.
- Antes de instalar cualquier dependencia nueva, verificar si ya está en `package.json`.
- Si encontrás un bug preexistente, reportarlo a Camilo antes de corregirlo — puede ser intencional o documentado en el informe del taller anterior.
- El deploy en GitHub Pages requiere permisos escalados en Windows 11. Avisar a Camilo antes de ejecutar `npm run deploy`. No ejecutarlo automáticamente.
- Las reglas de Firebase Storage vencen el **25 de mayo de 2026**. No modificar las reglas.
- El build puede fallar por permisos de Tailwind Oxide/Vite en entornos sin permisos escalados — es un problema conocido del entorno, no un bug del código.
- Issues de lint conocidos y no bloqueantes: `process` no definido en `scripts/seed.js` (entorno Node vs browser), warning de HMR en `src/main.jsx`. No intentar corregirlos.

---

## 7. Métricas a registrar (para el informe — Fase 4 del taller)

Camilo registra estas métricas manualmente. El agente deja el código instrumentado para facilitar la medición:

| Métrica                        | Cómo medirla                                                                  |
|-------------------------------|-------------------------------------------------------------------------------|
| Tiempo de arranque            | Manual con cronómetro — desde abrir URL hasta galería interactiva             |
| Tiempo de carga de productos  | DevTools Network → `firestore.googleapis.com` → columna Time                 |
| Tiempo de búsqueda            | DevTools Network (si hay request) o medir con `performance.now()` en el handler |
| Logs de eventos del flujo     | `window.__appLogs()` desde la consola del navegador → copiar output al informe |

---

## 8. Lo que Camilo recolecta antes de redactar el informe

El informe técnico **no lo redacta el agente del IDE**. Lo redacta el consultor en el Claude Project del Taller 3, usando las evidencias reales que Camilo trae después de que el código esté terminado y desplegado.

**Evidencias a recolectar antes de ir al Project a redactar:**

- **Output de `npm test`** — copiar el texto completo de la terminal (resultados de los 3 tests)
- **Output de `window.__appLogs()`** — abrir la consola del navegador en el deploy, ejecutar `window.__appLogs()`, copiar el array resultante
- **Métricas numéricas:**
  - Tiempo de arranque: cronómetro manual desde abrir la URL hasta galería interactiva
  - Tiempo de carga de productos: DevTools → Network → filtrar `firestore.googleapis.com` → columna Time
  - Tiempo de búsqueda: DevTools → Network o el valor que logee el logger en consola
- **Score de Lighthouse Accessibility** — DevTools → Lighthouse → correr solo categoría Accessibility → anotar el número
- **3 a 4 capturas de pantalla** del prototipo mostrando: spinner de carga, búsqueda activa con resultados, selector de idioma en Navbar, pantalla de checkout
- El push final a GitHub Pages (requiere credenciales y permisos locales de Windows — no lo ejecuta el agente automáticamente)

Una vez que tengas todo eso, llevalo al Claude Project del Taller 3 y pedí que se redacte el informe. El consultor genera el `.docx` listo para entregar cruzando las evidencias reales con los criterios del enunciado.

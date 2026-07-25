# Blue Velvet

Sitio web de **Blue Velvet**, pastelería artesanal ubicada en Alta Gracia, Córdoba. Landing page con catálogo de productos, sección "Nosotros" y contacto directo por WhatsApp e Instagram.

## Stack tecnológico

- **Frontend:** React 18 + TypeScript
- **Build:** Vite
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **Datos:** Locales en TypeScript + localStorage

## Estructura del proyecto

```
src/
├── components/
│   ├── landing/        # Hero, ProductCard, ProductModal, ProductsSection
│   ├── layout/         # Header, Footer
│   └── admin/          # AdminLogin, AdminPanel, ProductFormModal
├── data/               # Productos y credenciales admin (constantes TS)
├── hooks/              # useAuth, useProducts
├── types/              # definiciones de tipos (Product, Topping, Profile)
├── App.tsx             # componente principal
└── main.tsx            # punto de entrada
```

## Categorías de productos

- **Tortas** personalizadas
- **Tartas** clásicas
- **Postres** artesanales
- **Cupcakes**
- **Otros**

## Funcionalidades

- Sección Hero con imagen de fondo y CTAs
- Sección "Nuestra historia" con valores del emprendimiento
- Catálogo de productos con filtros por categoría
- Modal de detalle de producto con toppings y precios
- Botón flotante de WhatsApp
- Sección de Instagram
- Panel de administración (login + CRUD de productos)
- Datos persistentes en localStorage (sin backend externo)

## Administración

No hay botones visibles en la página. Para acceder al panel de admin, entrá a la URL con el hash `#/admin`:

```
http://localhost:5173/#/admin
```

Credenciales de login:

- **Email:** `admin@bluevelvet.com`
- **Contraseña:** `bluevelvet2026`

Los productos se editan directamente en `src/data/products.ts` o desde el panel de admin. Los cambios se guardan en `localStorage` del navegador.

## Arrancar el proyecto

```bash
npm install
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linting con ESLint |
| `npm run typecheck` | Verificación de tipos TypeScript |

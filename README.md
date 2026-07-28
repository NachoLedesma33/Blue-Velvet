# Blue Velvet Pastry House

Sitio web profesional para **Blue Velvet**, una pastelería artesanal ubicada en Alta Gracia, Córdoba. Landing page con catálogo de productos interactivo, generador de pedidos personalizados por WhatsApp, panel de administración y datos persistentes en localStorage.

**Demo en vivo:** [bluevelvet.vercel.app](https://bluevelvet.vercel.app)

---

## Stack

| Tecnología | Uso |
|------------|-----|
| **React 18 + TypeScript** | UI tipada con componentes modulares |
| **Vite** | Build rápido, HMR, tree-shaking |
| **Tailwind CSS** | Estilos utility-first responsive |
| **Lucide React** | Iconos livianos y consistentes |
| **Playwright** | Tests E2E multi-navegador |
| **localStorage** | Persistencia de datos sin backend |
| **Vercel** | Deploy continuo |

## Funcionalidades

- Catálogo de productos con filtros por categoría (Tortas, Tartas, Postres, Cupcakes)
- Carrusel de imágenes con zoom animado (spring easing estilo macOS Dock)
- Generador de pedidos personalizados con preview y envío directo por WhatsApp
- Soporte de formato bold de WhatsApp (`*text*`) en preview y enlaces
- Sección "Nuestra historia" con valores del emprendimiento
- Botón flotante de WhatsApp con tooltip
- Panel de administración con autenticación, CRUD de productos y búsqueda
- Diseño responsive (mobile/tablet/desktop)
- Persistencia de datos en localStorage
- Tests E2E automatizados (Playwright)

## Tests E2E

Se utiliza **Playwright** con 14 suites que cubren:

- Navegación general (header desktop/mobile, footer)
- Hero section y CTAs
- Grid de productos y modal de detalle
- Carrusel y zoom overlay
- Formulario de pedidos personalizados
- Enlaces de WhatsApp e Instagram
- Panel de administración (login, CRUD, logout)
- Persistencia de datos
- Diseño responsive en 3 breakpoints
- Performance (lazy loading, target blank)
- Casos edge (hashes rotos, formulario deshabilitado)

```bash
npx playwright test
```

## Screenshots

<!-- Agregar screenshots aquí -->

## Instalación y uso

```bash
git clone <repo-url>
npm install
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run lint       # Linting ESLint
npm run typecheck  # Verificación de tipos TS
```

## Sobre el proyecto

Blue Velvet es un emprendimiento familiar de pastelería artesanal. El sitio fue desarrollado para:

- **Visibilidad online** del emprendimiento
- **Catálogo digital** actualizable sin conocimientos técnicos (admin panel)
- **Generación de leads** vía WhatsApp con pedidos personalizados
- **Identidad de marca** coherente con la estética del producto

## Contacto

- **WhatsApp:** [+54 9 3547 65-0627](https://wa.me/5493547650627)
- **Instagram:** [@bluevelvet.pastry](https://www.instagram.com/bluevelvet.pastry/)

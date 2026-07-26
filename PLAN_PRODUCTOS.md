# Plan: Menú de Productos y Sección de Tortas Personalizadas

## Datos del cliente

- **WhatsApp:** `+54 9 3547 65-0627`
- **Instagram:** `@bluevelvet.pastry`

---

## 1. Listado de productos (catálogo público)

| # | Producto | Precio | Descripción | Categoría |
|---|----------|--------|-------------|-----------|
| 1 | Brownie | $3.000 | Brownie con ddl y crema de leche. Opcional: decoración extra | postre |
| 2 | Chocotorta | $50.000 | Decorada con ddl y galleta triturada. Opcional: decoración extra | torta |
| 3 | Tarta Coco y DDL | $22.000 | Coco y ddl | tarta |
| 4 | Húmedo con Nuez | $38.000 | Ddl, crema de leche y nueces trituradas | torta |
| 5 | Lemon Pie | $30.000 | Con merengue o crema de leche (a elección) | torta |
| 6 | Marquise | $25.000 | Humedo de chocolate con ddl y crema de leche. Opcional: merengue extra | postre |
| 7 | Torta Matilda | $40.000 | — | torta |
| 8 | Red Velvet | $50.000 | Bizcocho rojo, crema de queso (estilo clásico) | torta |
| 9 | Rogel | $20.000 | Capas de masa con ddl, decorado con merengue | torta |
| 10 | Tiramisú | $40.000 | Tiramisú clásico | postre |

### Notas de categorías
- **torta** — tortas enteras (para compartir, cumpleaños, eventos)
- **tarta** — tartas con base crocante
- **postre** — porciones individuales o porciones pequeñas

### Campos opcionales por producto
- `options: string[]` — variantes del producto (ej: Lemon Pie → ["Con merengue", "Con crema de leche"])
- `extras: string[]` — agregados opcionales con precio extra (ej: Brownie → ["Decoración extra"])

---

## 2. Sección de Tortas Personalizadas (nueva)

### 2.1 Galería de fotos
- Mostrar imágenes de tortas personalizadas ya realizadas
- Cada imagen tiene: foto, nombre/descripción breve, categoría
- Estilo grid tipo galería (2-3 columnas en desktop, 1 en mobile)
- Placeholder: buscar imágenes de referencia en Google/Pinterest de cada torta del catálogo para usar temporalmente

### 2.2 "Armá tu torta" (form builder)
Un formulario donde el cliente arma su pedido personalizado:

**Campos del formulario:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Tipo de torta | select | Brownie, Chocotorta, Tarta, Húmedo, Lemon Pie, Marquise, Matilda, Red Velvet, Rogel, Tiramisú, Otra |
| Rellenos disponibles | checkboxes | Ddl, Crema de leche, Merengue, Nueces, Frutas, Nutella, Dulce de leche, Otro |
| Cobertura | select | Ddl, Crema de queso, Merengue, Ganache, Sin cobertura, Otro |
| Cantidad de pisos | select | 1, 2, 3 |
| Decoración | textarea | Descripción libre de lo que quiere (colores, temática, texto, etc.) |
| Fecha del evento | date | Para coordinar disponibilidad |
| Mensaje adicional | textarea | Cualquier otra cosa que quiera aclarar |

### 2.3 Envío del pedido
Al completar el formulario:
1. Se compila todo en un **mensaje formateado**
2. Se muestra un **preview del mensaje** antes de enviar
3. Botón "Enviar por WhatsApp" que redirige a:
   ```
   https://wa.me/5493547650627?text={mensaje_encoded}
   ```
4. El mensaje se envía como texto plano (no se guarda en localStorage ni backend)

**Formato del mensaje WhatsApp:**
```
🎂 Pedido personalizado — Blue Velvet

Tipo de torta: [selección]
Rellenos: [selección]
Cobertura: [selección]
Pisos: [selección]
Decoración: [texto libre]
Fecha: [fecha]
Mensaje adicional: [texto libre]

---
Enviado desde bluevelvetpastry.com
```

---

## 3. Cambios en la UI existente

### Header
- Agregar link "Personalizadas" en la navegación → `#personalizadas`

### Hero
- Sin cambios (ya tiene CTAs funcionales)

### Sección "Nosotros"
- Sin cambios

### Catálogo de productos
- Reemplazar los 6 productos de ejemplo por los 10 productos reales del cliente
- Agregar campo `options` y `extras` al tipo `Product`
- Mostrar opciones de selección cuando el producto las tenga (ej: Lemon Pie con merengue o crema)

### Nueva sección: "Tortas Personalizadas"
- Después del catálogo, antes del CTA de Instagram
- Galería de fotos (placeholder con imágenes de Google/Pinterest)
- Formulario "Armá tu torta"
- Preview del mensaje + botón WhatsApp

### Footer
- Actualizar número de WhatsApp a `+54 9 3547 65-0627`
- Sin otros cambios

### WhatsAppButton (flotante)
- Actualizar número a `+54 9 3547 65-0627`

---

## 4. Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/data/products.ts` | Reemplazar productos de ejemplo por los 10 reales |
| `src/types/index.ts` | Agregar campos `options` y `extras` a `Product` |
| `src/components/landing/ProductCard.tsx` | Mostrar opciones de selección si existen |
| `src/components/landing/ProductModal.tsx` | Mostrar opciones y extras |
| `src/App.tsx` | Agregar sección de personalizadas |
| `src/components/landing/CustomCakes.tsx` | **Nuevo** — Galería + formulario |
| `src/components/layout/Header.tsx` | Agregar link "Personalizadas" |
| `src/components/layout/Footer.tsx` | Actualizar número de WhatsApp |
| `src/components/WhatsAppButton.tsx` | Actualizar número de WhatsApp |
| `public/images/products/` | **Nuevo** — Placeholder images de cada torta |

---

## 5. Orden de ejecución

1. **Actualizar tipos** — agregar `options` y `extras` a `Product`
2. **Actualizar productos** — reemplazar seed data con los 10 productos reales
3. **Actualizar WhatsApp** — número nuevo en Header, Footer y WhatsAppButton
4. **Actualizar catálogo** — mostrar opciones de selección en cards y modal
5. **Crear sección Personalizadas** — galería + formulario + preview mensaje
6. **Agregar link en Header** — navegación a sección de personalizadas
7. **Imágenes placeholder** — buscar y agregar imágenes de referencia
8. **Verificar** — typecheck, lint, build
9. **Commit y push**

---

## 6. Notas para el cliente

- Las imágenes de las tortas personalizadas son placeholder por ahora — cuando Guada tenga fotos reales se reemplazan
- El formulario de "Armá tu torta" no guarda nada — genera un mensaje de WhatsApp directo
- El número de WhatsApp se puede cambiar fácil en `src/data/config.ts` (futuro) o directamente en el código

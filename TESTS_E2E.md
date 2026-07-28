# Plan de Tests E2E — Blue Velvet Pastry House

> **Framework sugerido:** Cypress o Playwright
> **URL base:** `http://localhost:5173` (dev) / URL de Vercel (prod)
> **Última actualización:** 28/07/2026

---

## 1. Navegación General

### 1.1 Header — Navegación desktop
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 1.1.1 | Logo redirige al hero | Hacer clic en "Blue Velvet" del header | Scroll suave al section `#hero` |
| 1.1.2 | Link "Inicio" | Hacer clic en "Inicio" | Scroll al `#hero` |
| 1.1.3 | Link "Nuestros Productos" | Hacer clic | Scroll al `#productos` |
| 1.1.4 | Link "Personalizadas" | Hacer clic | Scroll al `#personalizadas` |
| 1.1.5 | Link "Nosotros" | Hacer clic | Scroll al `#nosotros` |
| 1.1.6 | Link "Contacto" | Hacer clic | Scroll al `#footer` |
| 1.1.7 | CTA "Hacer pedido" abre WhatsApp | Hacer clic | Se abre nueva pestaña con `wa.me/5493547650627` |
| 1.1.8 | Header cambia estilo al scroll | Hacer scroll hacia abajo | Header obtiene fondo blanco y sombra |

### 1.2 Header — Navegación mobile (≤768px)
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 1.2.1 | Hamburger abre menú | Hacer clic en icono hamburguesa | Se despliega menú mobile con links + CTA |
| 1.2.2 | Link del menú cierra menú | Hacer clic en cualquier link del menú mobile | Se cierra el menú y hace scroll al section |
| 1.2.3 | CTA WhatsApp en menú mobile | Hacer clic en "Hacer pedido por WhatsApp" | Se abre wa.me en nueva pestaña |
| 1.2.4 | Botón X cierra menú | Abrir menú, hacer clic en X | Se cierra el menú |

### 1.3 Footer
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 1.3.1 | Link Instagram | Hacer clic en ícono Instagram | Se abre `instagram.com/bluevelvet.pastry/` en nueva pestaña |
| 1.3.2 | Link WhatsApp footer | Hacer clic en ícono WhatsApp | Se abre `wa.me/5493547650627` en nueva pestaña |
| 1.3.3 | Links internos del footer | Hacer clic en "Tortas personalizadas", "Tortas clásicas", etc. | Hacen scroll al `#productos` |
| 1.3.4 | Aviso de seguridad visible | Verificar sección de seguridad | Texto visible con warning sobre canales oficiales |
| 1.3.5 | Footer responsive desktop | Verificar en ≥1024px | Grid de 3 columnas |
| 1.3.6 | Footer responsive tablet | Verificar en 768px-1023px | Grid de 2 columnas |
| 1.3.7 | Footer responsive mobile | Verificar en ≤767px | Grid de 1 columna, texto ajustado |

---

## 2. Hero Section

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 2.1 | CTA "Ver productos" | Hacer clic | Scroll suave al `#productos` (scrollIntoView) |
| 2.2 | CTA "Consultar pedido" | Hacer clic | Se abre wa.me en nueva pestaña |
| 2.3 | Stats visibles | Verificar los 3 stats | Muestran "100% Artesanal", "Personalizado Cada pedido", "Con amor Hecho a medida" |
| 2.4 | Imagen de fondo carga | Verificar imagen hero | Imagen visible y completa |
| 2.5 | Botón "Explorar" visible | Verificar en bottom del hero | Botón pill con "Explorar" + flecha visible |
| 2.6 | Botón "Explorar" tiene pulse | Observar animación | Botón pulsa sutilmente (animate-pulse) |
| 2.7 | Botón "Explorar" hace scroll | Hacer clic en el botón | Scroll suave al `#productos` |
| 2.8 | Hover en botón "Explorar" | Pasar mouse sobre botón | Color cambia (hover:bg-white/25, hover:text-white) |
| 2.9 | Blobs decorativos responsive | Verificar en mobile | Blobs más pequeños (w-32 h-32) y reposicionados |

---

## 3. Sección "Nuestros Productos"

### 3.1 Grid de productos
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 3.1.1 | Se muestran todos los productos | Navegar a `#productos` | Se renderizan 10 cards de productos |
| 3.1.2 | Cada card muestra imagen | Verificar cada card | Imagen .webp visible con object-cover |
| 3.1.3 | Cada card muestra nombre | Verificar texto | Nombre del producto visible |
| 3.1.4 | Cada card muestra precio | Verificar precio | Precio en formato ARS (ej: $30.000) |
| 3.1.5 | Cada card muestra "Ver más →" | Verificar badge | Badge visible al pie de la card |
| 3.1.6 | **NO muestra stock** | Verificar cards | No hay indicador de stock visible en las cards |
| 3.1.7 | **NO hay filtros de categoría** | Verificar sección | No existen botones/filtros de categoría |
| 3.1.8 | Hover en card efecto visual | Pasar mouse sobre card | Card levanta (shadow-xl, -translate-y-1) |
| 3.1.9 | Cards responsive | Verificar en mobile/tablet | Grid se adapta: 1 col mobile, 2 cols tablet, 3 cols desktop |

### 3.2 Modal de producto
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 3.2.1 | Click en card abre modal | Hacer clic en cualquier card | Se abre modal con detalle del producto |
| 3.2.2 | Modal muestra imagen original | Verificar imagen en modal | Imagen con `object-contain`, tamaño original sin recorte |
| 3.2.3 | Modal muestra nombre | Verificar título | Nombre del producto visible |
| 3.2.4 | Modal muestra descripción | Verificar texto | Descripción corta y completa visibles |
| 3.2.5 | Modal muestra precio base | Verificar precio | Precio visible con label "Precio base" |
| 3.2.6 | Modal muestra toppings incluidos | Verificar sección | Lista de toppings incluidos visibles |
| 3.2.7 | Modal muestra opciones (si tiene) | Abrir Lemon Pie | Opciones "Cobertura: Merengue / Crema de leche" visibles |
| 3.2.8 | Modal muestra tags | Verificar tags | Tags como badges visibles |
| 3.2.9 | CTA WhatsApp con nombre de producto | Hacer clic en "Consultar por WhatsApp" | Se abre wa.me con mensaje incluyendo nombre del producto |
| 3.2.10 | Cerrar modal con X | Hacer clic en botón X | Se cierra el modal |
| 3.2.11 | Cerrar modal clickeando afuera | Hacer clic en overlay oscuro | Se cierra el modal |
| 3.2.12 | Cerrar modal con Escape | Presionar tecla Escape | Se cierra el modal |

---

## 4. Sección "Personalizadas" — Carrusel

### 4.1 Carrusel
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 4.1.1 | Carrusel visible | Navegar a `#personalizadas` | Sección "Nuestras creaciones" visible |
| 4.1.2 | Subtítulo visible | Verificar texto | "Personalizadas a nuestros clientes" visible |
| 4.1.3 | Carrusel se mueve solo | Observar 5 segundos | Las imágenes se desplazan automáticamente (animación infinite) |
| 4.1.4 | Pausa al hover | Pasar mouse sobre carrusel | La animación se detiene |
| 4.1.5 | Reanuda al salir mouse | Sacar mouse del carrusel | La animación continúa |
| 4.1.6 | **NO hay scroll horizontal** | Verificar barra de scroll | La página NO tiene scroll horizontal en ningún breakpoint |
| 4.1.7 | Cards responsive | Verificar en mobile/tablet | Mobile: w-48 h-48, SM: w-64 h-64, MD: w-72 h-72 |

### 4.2 Zoom overlay
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 4.2.1 | Click en imagen abre overlay | Hacer clic en una imagen del carrusel | Se abre overlay fijo con la imagen agrandada |
| 4.2.2 | **Animación desde card** | Hacer clic y observar | La imagen parte de la posición de la card y se agranda al centro (spring easing) |
| 4.2.3 | **Backdrop oscuro con blur** | Verificar overlay | Fondo semi-transparente con blur (backdrop-blur-sm) |
| 4.2.4 | **Imagen completa visible** | Verificar imagen en overlay | Imagen sin recorte (object-contain), tamaño original |
| 4.2.5 | **Carrusel pausa durante zoom** | Abrir overlay, observar carrusel | El carrusel NO se mueve mientras el overlay está abierto |
| 4.2.6 | Click en backdrop cierra | Hacer clic fuera de la imagen | Se cierra el overlay con animación inversa |
| 4.2.7 | **Carrusel mantiene posición al cerrar** | Abrir overlay, cerrar | La imagen está en la misma posición donde se hizo click |
| 4.2.8 | **Zoom responsive mobile** | Abrir overlay en mobile | Imagen se adapta al viewport (max 90vw, 85vh) |

---

## 5. Sección "Personalizadas" — Formulario "Armá tu torta"

### 5.1 Tipo de bizcochuelos
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.1.1 | Botones visibles | Verificar 3 botones | "Vainilla", "Chocolate", "Red Velvet" visibles |
| 5.1.2 | Selección de bizcochuelo | Hacer clic en "Chocolate" | Botón seleccionado (fondo navy-800, texto blanco) |
| 5.1.3 | Click en otro bizcochuelo | Hacer clic en "Vainilla" | Se deselecciona el anterior, se selecciona el nuevo |
| 5.1.4 | Botón enviar deshabilitado sin bizcochuelo | No seleccionar ningún bizcochuelo | Botón "Enviar pedido por WhatsApp" deshabilitado (opacity-50) |
| 5.1.5 | Botón enviar habilitado con bizcochuelo | Seleccionar un bizcochuelo | Botón habilitado |

### 5.2 Tipo de rellenos
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.2.1 | Chips de rellenos visibles | Verificar | 5 chips: Crema, Dulce de leche, Ganache, Crema Bariloche, Cream cheese |
| 5.2.2 | Selección simple de relleno | Hacer clic en "Dulce de leche" | Chip seleccionado (navy-800) |
| 5.2.3 | Click en otro relleno | Hacer clic en "Ganache de chocolate" | Se deselecciona el anterior |
| 5.2.4 | Click en mismo relleno lo deselecciona | Hacer clic dos veces en el mismo | Se deselecciona (toggle off) |

### 5.3 Tipo de coberturas
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.3.1 | Chips de cobertura visibles | Verificar | 3 chips: Crema, Ganache, Buttercream |
| 5.3.2 | Selección de cobertura | Hacer clic en "Ganache" | Chip seleccionado |
| 5.3.3 | Toggle off cobertura | Hacer clic en el mismo | Se deselecciona |

### 5.4 Cantidad de pisos
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.4.1 | Botones de pisos visibles | Verificar | Botones "1" y "2" visibles |
| 5.4.2 | Default es 1 | Verificar estado inicial | Botón "1" seleccionado por defecto |
| 5.4.3 | Selección de pisos | Hacer clic en "2" | Botón "2" seleccionado, "1" deseleccionado |

### 5.5 Fecha del evento
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.5.1 | Input date visible | Verificar | Campo de fecha visible |
| 5.5.2 | Selección de fecha | Seleccionar una fecha | Valor se muestra en el campo |

### 5.6 Mensaje adicional
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.6.1 | Textarea visible | Verificar | Textarea con placeholder "Algo más que quieras contarnos..." |
| 5.6.2 | Escritura en textarea | Escribir texto | Texto se muestra en el campo |

### 5.7 Preview del mensaje
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.7.1 | Click "Ver preview" muestra preview | Hacer clic en "Ver preview del mensaje" | Se muestra panel con el mensaje formateado |
| 5.7.2 | Click "Ocultar preview" oculta | Hacer clic nuevamente | Se oculta el panel |
| 5.7.3 | Preview refleja selecciones | Seleccionar bizcochuelo + relleno, ver preview | El texto incluye "Tipo de torta: X" y "Relleno: Y" |
| 5.7.4 | Preview incluye separadores | Verificar formato | Mensaje tiene líneas `________________________` |

### 5.8 Envío por WhatsApp
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.8.1 | Envío completo | Seleccionar bizcochuelo + relleno + cobertura, clic enviar | Se abre wa.me con mensaje completo y estructurado |
| 5.8.2 | Mensaje incluye "Tipo de torta" | Verificar URL codificada | Texto incluye `Tipo de torta: [selección]` |
| 5.8.3 | Mensaje incluye "Relleno" | Verificar URL codificada | Texto incluye `Relleno: [selección]` |
| 5.8.4 | Mensaje incluye "Cobertura" | Verificar URL codificada | Texto incluye `Cobertura: [selección]` |
| 5.8.5 | Mensaje incluye "Pisos" solo si > 1 | Seleccionar 2 pisos | Texto incluye `Pisos: 2` |
| 5.8.6 | Mensaje NO incluye "Pisos" si es 1 | Dejar en 1 piso | Texto NO incluye línea de pisos |
| 5.8.7 | Mensaje incluye decoración | Verificar siempre | Texto incluye "La decoración la coordinamos por WhatsApp." |
| 5.8.8 | Mensaje incluye pie | Verificar | Texto incluye "bluevelvetpastry.com" |
| 5.8.9 | **Mensaje sin emojis rotos** | Verificar mensaje completo | No hay emojis 💙 ni caracteres rotos |

### 5.9 Formulario responsive
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 5.9.1 | Padding mobile | Verificar en ≤767px | Formulario con padding reducido (p-5) |
| 5.9.2 | Botones bizcochuelo mobile | Verificar en mobile | Botones en fila, texto legible |
| 5.9.3 | Chips rellenos mobile | Verificar en mobile | Chips con flex-wrap, no se desbordan |
| 5.9.4 | Botones enviar mobile | Verificar en mobile | Stack vertical (flex-col) |

---

## 6. Sección Instagram CTA

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 6.1 | Sección visible | Verificar | Sección "Seguinos en Instagram" visible |
| 6.2 | Link abre Instagram | Hacer clic en "@bluevelvetpastry" | Se abre `instagram.com/bluevelvet.pastry/` en nueva pestaña |
| 6.3 | Blobs decorativos | Verificar | Blobs posicionados correctamente (no se desbordan) |
| 6.4 | **Responsive mobile** | Verificar en ≤767px | Textos e ícono escalados, blobs más pequeños |
| 6.5 | **Responsive tablet** | Verificar en 768px-1023px | Layout correcto, sin overflow |

---

## 7. Botón Flotante de WhatsApp

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 7.1 | Botón visible siempre | Verificar en cualquier sección | Botón verde fijo abajo a la derecha |
| 7.2 | Hover muestra tooltip | Pasar mouse sobre botón | Aparece "Hacer un pedido" en tooltip blanco |
| 7.3 | Click abre WhatsApp | Hacer clic | Se abre wa.me con mensaje predefinido |
| 7.4 | Mensaje profesional | Verificar URL | Mensaje: "Hola! Me comunico desde la pagina web..." |
| 7.5 | **Tooltip no visible en mobile** | Verificar en ≤639px | Tooltip con "Hacer un pedido" oculto (hidden sm:flex) |

---

## 8. Panel Admin — Login

### 8.1 Acceso
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 8.1.1 | Navegar a #/admin sin sesión | Ir a `#/admin` | Se muestra modal de login |
| 8.1.2 | Credenciales correctas | Email: `admin@bluevelvet.com`, Pass: `bluevelvet2026`, clic Ingresar | Se accede al panel admin |
| 8.1.3 | Credenciales incorrectas | Email incorrecto o pass incorrecto | Error: "Credenciales incorrectas. Verificá tu email y contraseña." |
| 8.1.4 | Email vacío | Dejar email vacío, clic Ingresar | Validación HTML5 impide envío (required) |
| 8.1.5 | Password vacío | Dejar pass vacío, clic Ingresar | Validación HTML5 impide envío (required) |
| 8.1.6 | Toggle mostrar/ocultar password | Hacer clic en ícono ojo | Password cambia entre texto visible y oculto |
| 8.1.7 | Link "Volver a la tienda" | Hacer clic | Se cierra el modal y se queda en la tienda |
| 8.1.8 | Sesión persiste al recargar | Login, recargar página | Se mantiene logueado (localStorage) |

### 8.2 Cierre de sesión
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 8.2.1 | Click "Salir" | Hacer clic en "Salir" | Se cierra sesión, se vuelve a la tienda |
| 8.2.2 | Sesión cerrada no accede a admin | Ir a `#/admin` después de logout | Se muestra modal de login |

---

## 9. Panel Admin — Dashboard

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 9.1 | Stats visibles | Verificar 4 cards | Total productos, Disponibles, Destacados, Sin stock |
| 9.2 | Stats son correctos | Contar manualmente | Los números coinciden con los productos reales |
| 9.3 | Logo y nombre admin | Verificar header | "Blue Velvet" + "Admin" + "super_admin" visibles |
| 9.4 | Botón "Ver tienda" | Hacer clic | Se vuelve a la vista de tienda |

---

## 10. Panel Admin — CRUD Productos

### 10.1 Listado
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 10.1.1 | Productos visibles | Verificar lista | Se muestran todos los productos (10 iniciales) |
| 10.1.2 | Cada producto muestra imagen | Verificar thumbnails | Imagen .webp o placeholder visible |
| 10.1.3 | Cada producto muestra nombre | Verificar | Nombre visible |
| 10.1.4 | Cada producto muestra categoría | Verificar badge | Badge con categoría visible |
| 10.1.5 | Cada producto muestra precio | Verificar | Precio formateado visible |
| 10.1.6 | Búsqueda filtra productos | Escribir "choco" en búsqueda | Solo muestra "Chocotorta" |

### 10.2 Crear producto
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 10.2.1 | Click "Nuevo producto" abre formulario | Hacer clic | Se abre ProductFormModal vacío |
| 10.2.2 | Crear producto completo | Llenar nombre, categoría, precio, descripción, imagen URL, topping | Producto se crea y aparece en la lista |
| 10.2.3 | Nombre requerido | Dejar nombre vacío, clic guardar | Error: "El nombre es requerido." |
| 10.2.4 | Categoría default | Verificar | Default es "Torta" |
| 10.2.5 | Toggle Disponible | Cambiar toggle | Valor se refleja en el producto |
| 10.2.6 | Toggle Destacado | Cambiar toggle | Valor se refleja en el producto |
| 10.2.7 | Agregar imagen URL | Escribir URL + clic + o Enter | Imagen se agrega a la lista |
| 10.2.8 | Eliminar imagen | Hover sobre imagen, clic trash | Imagen se elimina |
| 10.2.9 | Agregar topping | Clic "Agregar" en toppings | Nueva fila de topping aparece |
| 10.2.10 | Editar topping | Modificar nombre, precio, estado included/extra | Cambios se reflejan |
| 10.2.11 | Eliminar topping | Clic trash en fila de topping | Topping se elimina |
| 10.2.12 | Agregar tag | Escribir tag + clic + o Enter | Tag aparece como badge |
| 10.2.13 | Eliminar tag | Clic X en badge de tag | Tag se elimina |
| 10.2.14 | Cancelar cierra sin guardar | Clic "Cancelar" | Se cierra el modal, no se crea producto |

### 10.3 Editar producto
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 10.3.1 | Click editar abre formulario precargado | Hacer clic en ícono lápiz | Se abre modal con datos del producto |
| 10.3.2 | Modificar nombre | Cambiar nombre, guardar | Nombre se actualiza en la lista |
| 10.3.3 | Modificar precio | Cambiar precio, guardar | Precio se actualiza |
| 10.3.4 | Modificar disponibilidad | Toggle disponibilidad, guardar | Estado se actualiza |

### 10.4 Eliminar producto
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 10.4.1 | Click eliminar abre confirmación | Hacer clic en ícono trash | Se abre modal de confirmación |
| 10.4.2 | "Cancelar" cierra sin eliminar | Clic "Cancelar" | Producto sigue en la lista |
| 10.4.3 | "Si, eliminar" borra el producto | Clic "Si, eliminar" | Producto se elimina de la lista y de localStorage |
| 10.4.4 | Eliminación persiste al recargar | Eliminar producto, recargar | Producto no aparece |

### 10.5 Toggle disponibilidad
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 10.5.1 | Toggle disponible a no disponible | Hacer clic en CheckCircle de un producto disponible | Cambia a XCircle, producto marcado como no disponible |
| 10.5.2 | Toggle no disponible a disponible | Hacer clic en XCircle | Cambia a CheckCircle |
| 10.5.3 | Cambio persiste al recargar | Toggle, recargar | Estado se mantiene |

---

## 11. Persistencia localStorage

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 11.1 | Auth persiste | Login, recargar | Sesión activa |
| 11.2 | Auth se limpia al salir | Login, salir, recargar | Sin sesión |
| 11.3 | Productos persisten | Editar producto, recargar | Cambios presentes |
| 11.4 | Productos se resetean | Borrar `bluevelvet_products` del localStorage, recargar | Aparecen los 10 productos iniciales |
| 11.5 | Nuevo producto persiste | Crear producto, recargar | Producto sigue ahí |
| 11.6 | Eliminación persiste | Eliminar producto, recargar | Producto no aparece |

---

## 12. Responsive Design

### 12.1 Desktop (≥1024px)
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 12.1.1 | Grid de productos 3 columnas | Verificar en desktop | 3 cards por fila |
| 12.1.2 | Header horizontal | Verificar | Nav links horizontales visibles |
| 12.1.3 | Hero layout completo | Verificar | Imagen + texto lado a lado |
| 12.1.4 | Footer 3 columnas | Verificar | Grid de 3 columnas |

### 12.2 Tablet (768px - 1023px)
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 12.2.1 | Grid de productos 2 columnas | Verificar en tablet | 2 cards por fila |
| 12.2.2 | Header con hamburger | Verificar | hamburger visible, nav oculto |
| 12.2.3 | Footer 2 columnas | Verificar | Grid de 2 columnas |
| 12.2.4 | Carousel cards w-64 h-64 | Verificar | Cards tamaño intermedio |

### 12.3 Mobile (≤767px)
| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 12.3.1 | Grid de productos 1 columna | Verificar en mobile | 1 card por fila |
| 12.3.2 | Modales slide-up | Abrir modal en mobile | Modal aparece desde abajo (rounded-t-3xl) |
| 12.3.3 | Carousel cards w-48 h-48 | Verificar carrusel | Imágenes más pequeñas en mobile |
| 12.3.4 | Formulario usable en mobile | Completar formulario | Todos los campos accesibles y completables |
| 12.3.5 | Botón WhatsApp flotante visible | Verificar | Botón visible en esquina inferior derecha |
| 12.3.6 | **Sin scroll horizontal** | Verificar en mobile | La página NO tiene scroll horizontal |
| 12.3.7 | **Zoom overlay responsive** | Abrir zoom en mobile | Imagen se adapta al viewport (max 90vw, 85vh) |
| 12.3.8 | **Blobs decorativos responsive** | Verificar Hero + Instagram CTA | Blobs más pequeños y reposicionados |
| 12.3.9 | **Footer 1 columna** | Verificar | Todo apilado verticalmente |
| 12.3.10 | **Instagram CTA responsive** | Verificar | Textos e ícono escalados correctamente |

---

## 13. Performance y Accesibilidad

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 13.1 | Imágenes cargan con lazy loading | Verificar atributo `loading="lazy"` | Imágenes fuera de viewport no cargan hasta ser visibles |
| 13.2 | Imágenes .webp cargan | Verificar network tab | Todas las imágenes de producto son .webp |
| 13.3 | Animaciones suaves | Verificar transiciones | No hay parpadeos ni saltos bruscos |
| 13.4 | Links WhatsApp abren en nueva pestaña | Verificar `target="_blank"` | Todos abren en nueva pestaña |
| 13.5 | Formularios tienen labels | Verificar `label` o `aria-label` | Todos los campos accesibles |
| 13.6 | Modales foco trapped | Abrir modal, presionar Tab | El foco se mantiene dentro del modal |
| 13.7 | Color contrast textos silver | Verificar contraste | Textos silver-400/500 legibles sobre fondo blanco |
| 13.8 | **Overflow hidden global** | Verificar `html, body` | `overflow-x: hidden` aplicado, sin scroll horizontal |
| 13.9 | **Carousel overflow hidden** | Verificar contenedor carousel | `overflow-hidden` en el wrapper del carousel |

---

## 14. Edge Cases

| # | Test | Pasos | Resultado esperado |
|---|------|-------|--------------------|
| 14.1 | Sin productos en localStorage | Borrar storage, recargar | Se muestran los 10 productos iniciales |
| 14.2 | Producto sin imagen | Crear producto sin URL de imagen | Se muestra placeholder |
| 14.3 | Producto sin toppings | Crear producto sin toppings | Sección de toppings vacía o no mostrada |
| 14.4 | Producto sin tags | Crear producto sin tags | No se muestran badges de tags |
| 14.5 | URL con hash #/admin | Navegar directamente a `#/admin` | Se carga admin (pide login si no hay sesión) |
| 14.6 | Navegación con hash roto | Navegar a `#/noexiste` | Se muestra la tienda (vista por defecto) |
| 14.7 | Doble clic rápido en enviar WhatsApp | Hacer clic dos veces rápido | Solo se abre una pestaña de WhatsApp |
| 14.8 | Formulario sin completar nada | Clic "Enviar pedido" sin selections | Botón deshabilitado, no hace nada |
| 14.9 | **Click rápido en carousel durante zoom** | Hacer clic rápido en otra imagen mientras zoom está abierto | Zoom cierra correctamente, carrusel se pausa |
| 14.10 | **Resize durante zoom abierto** | Abrir zoom, cambiar tamaño de ventana | Overlay se adapta correctamente al nuevo tamaño |
| 14.11 | **Scroll durante zoom abierto** | Abrir zoom, intentar scroll | Overlay fijo cubre toda la pantalla, scroll bloqueado |

---

## 15. Cambios recientes (post-creación del plan)

> Tests que cubren los cambios realizados después del plan inicial.

| # | Test | Cambio asociado | Resultado esperado |
|---|------|-----------------|--------------------|
| 15.1 | Botón "Explorar" usa scrollIntoView | `scrollIntoView` en vez de hash links | Scroll funciona en local y producción |
| 15.2 | Botón "Explorar" es `<button>` | No usa `<a href>` | Click confiable en todos los navegadores |
| 15.3 | Botón "Explorar" tiene animate-pulse | Efecto sutil de pulso | Indica interactividad sin bounce |
| 15.4 | Zoom es overlay fijo (no inline scale) | `position: fixed` en overlay | No empuja contenido debajo |
| 15.5 | Zoom animación spring easing | `cubic-bezier(0.34, 1.3, 0.64, 1)` | Efecto elástico tipo macOS dock |
| 15.6 | Zoom cierra con animación inversa | Reverse easing al cerrar | Transición suave de cierre |
| 15.7 | Carrusel se pausa durante zoom | `[animation-play-state:paused]` cuando zoom abierto | Carrusel no se mueve durante overlay |
| 15.8 | Carrusel mantiene posición al cerrar zoom | Pausa + misma posición | Imagen en misma posición al cerrar |
| 15.9 | Imágenes Lemon Pie y Red Velvet actualizadas | Nuevas .webp reemplazan anteriores | Imágenes nuevas visibles |
| 15.10 | **overflow-x hidden en html/body** | Previene scroll horizontal global | Página nunca muestra scroll horizontal |
| 15.11 | **Carousel overflow-hidden** | Contenedor clipa cards | Cards no se desbordan del carrusel |
| 15.12 | **Responsive Personalizadas section** | Padding, gap, tamaños responsive | Sección completa usable en mobile |
| 15.13 | **Responsive Instagram CTA** | Blobs y textos escalados | Sección completa usable en mobile |
| 15.14 | **Responsive Footer** | Grid sm:2 cols, md:3 cols | Footer adaptable a todos los breakpoints |
| 15.15 | **Responsive Hero blobs** | Tamaño y posición responsive | Blobs no se desbordan en mobile |
| 15.16 | **Zoom overlay responsive** | Padding p-4 sm:p-8 md:p-12, max 90vw | Overlay funciona en todos los tamaños |
| 15.17 | **Modal NO muestra stock** | Abrir modal de cualquier producto | No hay indicador de "unidades" ni icono Package |
| 15.18 | **Modal muestra "No disponible"** | Abrir modal de producto sin stock | Muestra "No disponible" con XCircle (no "Sin stock") |
| 15.19 | **Modal sin Package import** | Verificar imports del componente | `Package` no está importado de lucide-react |
| 15.20 | **WhatsApp bold con asteriscos simples** | Verificar mensajes wa.me | Usan `*text*` (no `**text**`) — formato correcto de WhatsApp |
| 15.21 | **Sin scroll horizontal en todos los breakpoints** | Verificar en desktop, tablet, mobile | `overflow-x: hidden` en html/body previene scroll horizontal |
| 15.22 | **Carousel cards responsive** | Verificar tamaños en mobile/sm/md | w-48 → sm:w-64 → md:w-72, alturas correspondientes |

# Tienda de Ropa

Trabajo Práctico 1 de Construcción de Interfaces de Usuario de la Universidad Nacional de Hurlingham (UNAHUR).

## Descripción

Aplicación web que simula una tienda de indumentaria con un catálogo de remeras, buzos y pantalones. No se realizan pagos reales.

## Funcionalidades

- Página de inicio con la identidad de la tienda y acceso al catálogo.
- Catálogo de 12 productos con búsqueda por nombre (sin importar tildes), filtro por categoría, orden por precio y filtro de favoritos.
- Detalle de cada producto en `/producto/:id`, con descripción completa y características.
- Carrito con cantidades, subtotales, total y unidades totales. No permite superar el stock disponible.
- Códigos de descuento en el carrito: `DESCUENTO5`, `DESCUENTO10`, `DESCUENTO15`, `DESCUENTO20` y `DESCUENTO25`.
- Favoritos: se marcan desde la card o el detalle y se pueden filtrar en el catálogo.
- Modo claro y oscuro.
- Página Nosotros.
- El carrito, los favoritos y el tema se guardan en `localStorage`, así que no se pierden al recargar la página.
- Inicio de sesión y registro simulados, necesarios para finalizar la compra.
- Formulario de compra con validaciones por campo y mensaje de confirmación con el resumen del pedido.
- Página 404 para rutas inexistentes.

## Tecnologías

- JavaScript y React.
- React Router DOM para la navegación.
- Bootstrap y React Bootstrap para la interfaz.
- Vite como herramienta de desarrollo.

## Requisitos y ejecución

Se requiere Node.js 22.18 o una versión posterior compatible con las dependencias del proyecto, y npm.

Desde la carpeta del proyecto, instalar las dependencias e iniciar el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abrir en el navegador la dirección que indique la terminal. El carrito, los favoritos y el tema se conservan al recargar la página; la sesión, en cambio, se reinicia.

## Estructura

```
src/
  components/   Componentes reutilizables (Navbar, Footer, ProductoCard, CarritoItem, FormularioCompra)
  pages/        Una página por ruta (Inicio, Productos, DetalleProducto, Carrito, Contacto, Nosotros, Acceso)
  data/         Productos y códigos de descuento
  utils/        Funciones auxiliares (formato de precios y totales del carrito)
  App.jsx       Rutas y estado del carrito
  main.jsx      Punto de entrada
```

## Integrantes

- Sebastián Horacio Diaz
- Nahuel Solano
- Renzo Santino Dottori Giordano
- Magno Tellechea
- Jeremias Markevich
